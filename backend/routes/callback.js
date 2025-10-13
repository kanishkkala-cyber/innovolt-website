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

// POST /api/callback - Handle callback request form
router.post('/', [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('phone').isMobilePhone().withMessage('Valid phone number is required'),
  body('city').notEmpty().trim().withMessage('City is required'),
  body('preferredTime').optional().trim(),
  body('message').optional().trim()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array()
    });
  }

  const { name, phone, city, preferredTime, message } = req.body;

  try {
    // Save callback request to database
    const query = `
      INSERT INTO callback_requests (name, phone, city, preferredTime, message)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(query, [name, phone, city, preferredTime, message], function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to save callback request' });
      }

      const callbackId = this.lastID;

      // Send email notification (if email is configured)
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        sendCallbackEmail({ 
          callbackId, 
          name, 
          phone, 
          preferredTime, 
          message 
        })
          .then(() => {
            console.log(`✅ Callback email sent for request ${callbackId}`);
          })
          .catch((emailErr) => {
            console.error('Email sending failed:', emailErr);
            // Don't fail the request if email fails
          });
      }

      res.status(201).json({
        success: true,
        message: 'Thank you! We will call you back soon.',
        callbackId
      });
    });

  } catch (error) {
    console.error('Callback request error:', error);
    res.status(500).json({ error: 'Failed to process callback request' });
  }
});

// GET /api/callback - Get all callback requests (Admin only - for future use)
router.get('/', (req, res) => {
  const { status = 'new', limit = 50, offset = 0 } = req.query;

  const query = `
    SELECT * FROM callback_requests 
    WHERE status = ? 
    ORDER BY createdAt DESC 
    LIMIT ? OFFSET ?
  `;

  db.all(query, [status, parseInt(limit), parseInt(offset)], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch callback requests' });
    }

    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  });
});

// PUT /api/callback/:id/status - Update callback request status (Admin only)
router.put('/:id/status', [
  body('status').isIn(['new', 'called', 'no_answer', 'not_interested', 'completed']).withMessage('Invalid status')
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

  db.run('UPDATE callback_requests SET status = ? WHERE id = ?', [status, id], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to update status' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Callback request not found' });
    }

    res.json({
      success: true,
      message: 'Status updated successfully'
    });
  });
});

// Helper function to send callback email
const sendCallbackEmail = async ({ 
  callbackId, 
  name, 
  phone, 
  preferredTime, 
  message 
}) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_FROM, // Send to yourself
    subject: `New Callback Request #${callbackId} - ${name}`,
    html: `
      <h2>New Callback Request</h2>
      <p><strong>Request ID:</strong> ${callbackId}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Preferred Time:</strong> ${preferredTime || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${message || 'No message provided'}</p>
      <hr>
      <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
    `
  };

  // Send SMS-style notification (you can integrate with SMS service later)
  const smsNotification = `
    📞 New Callback Request #${callbackId}
    Name: ${name}
    Phone: ${phone}
    Time: ${preferredTime || 'Any time'}
    Message: ${message || 'No message'}
  `;

  console.log('SMS Notification:', smsNotification);

  await transporter.sendMail(mailOptions);
};

module.exports = router;
