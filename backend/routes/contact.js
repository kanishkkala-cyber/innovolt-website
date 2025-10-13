const express = require('express');
const router = express.Router();
const { db } = require('../models/database');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Email transporter setup
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// POST /api/contact - Handle contact form submissions
router.post('/', [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('phone').isMobilePhone().withMessage('Valid phone number is required'),
  body('city').notEmpty().trim().withMessage('City is required'),
  body('message').notEmpty().trim().withMessage('Message is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array()
    });
  }

  const { name, phone, city, message } = req.body;

  try {
    // Save to database
    const query = `
      INSERT INTO contact_submissions (name, phone, city, message)
      VALUES (?, ?, ?, ?)
    `;

    db.run(query, [name, phone, city, message], function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to save contact submission' });
      }

      const submissionId = this.lastID;

      // Send email notification (if email is configured)
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        sendContactEmail({ name, email, phone, subject, message, submissionId })
          .then(() => {
            console.log(`✅ Contact email sent for submission ${submissionId}`);
          })
          .catch((emailErr) => {
            console.error('Email sending failed:', emailErr);
            // Don't fail the request if email fails
          });
      }

      res.status(201).json({
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.',
        submissionId
      });
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Failed to process contact submission' });
  }
});

// GET /api/contact - Get all contact submissions (Admin only - for future use)
router.get('/', (req, res) => {
  const { status = 'new', limit = 50, offset = 0 } = req.query;

  const query = `
    SELECT * FROM contact_submissions 
    WHERE status = ? 
    ORDER BY createdAt DESC 
    LIMIT ? OFFSET ?
  `;

  db.all(query, [status, parseInt(limit), parseInt(offset)], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch contact submissions' });
    }

    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  });
});

// PUT /api/contact/:id/status - Update contact submission status (Admin only)
router.put('/:id/status', [
  body('status').isIn(['new', 'in_progress', 'resolved', 'closed']).withMessage('Invalid status')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array()
    });
  }

  const { id } = req.params;
  const { status } = req.body;

  db.run('UPDATE contact_submissions SET status = ? WHERE id = ?', [status, id], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to update status' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }

    res.json({
      success: true,
      message: 'Status updated successfully'
    });
  });
});

// Helper function to send contact email
const sendContactEmail = async ({ name, email, phone, subject, message, submissionId }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_FROM, // Send to yourself
    subject: `New Contact Form Submission #${submissionId} - ${subject || 'No Subject'}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Submission ID:</strong> ${submissionId}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
    `
  };

  // Send auto-reply to customer
  const autoReplyOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Thank you for contacting Innovolt',
    html: `
      <h2>Thank you for contacting Innovolt!</h2>
      <p>Dear ${name},</p>
      <p>We have received your message and will get back to you within 24 hours.</p>
      <p><strong>Your submission ID:</strong> ${submissionId}</p>
      <p><strong>Your message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p>Best regards,<br>Innovolt Team</p>
    `
  };

  await transporter.sendMail(mailOptions);
  await transporter.sendMail(autoReplyOptions);
};

module.exports = router;
