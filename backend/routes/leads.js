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

// POST /api/leads - Handle lead capture from vehicle pages
router.post('/', [
  body('carId').isInt().withMessage('Valid car ID is required'),
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').isMobilePhone().withMessage('Valid phone number is required'),
  body('message').optional().trim()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array()
    });
  }

  const { carId, name, email, phone, message } = req.body;

  try {
    // Verify car exists
    db.get('SELECT title, brand, price FROM cars WHERE id = ? AND status = "active"', [carId], (err, car) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to verify car' });
      }

      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }

      // Save lead to database
      const query = `
        INSERT INTO lead_captures (carId, name, email, phone, message)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.run(query, [carId, name, email, phone, message], function(err) {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Failed to save lead' });
        }

        const leadId = this.lastID;

        // Send email notification (if email is configured)
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
          sendLeadEmail({ 
            leadId, 
            carId, 
            carTitle: car.title, 
            carBrand: car.brand, 
            carPrice: car.price,
            name, 
            email, 
            phone, 
            message 
          })
            .then(() => {
              console.log(`✅ Lead email sent for lead ${leadId}`);
            })
            .catch((emailErr) => {
              console.error('Email sending failed:', emailErr);
              // Don't fail the request if email fails
            });
        }

        res.status(201).json({
          success: true,
          message: 'Thank you for your interest! We will contact you soon.',
          leadId,
          car: {
            title: car.title,
            brand: car.brand,
            price: car.price
          }
        });
      });
    });

  } catch (error) {
    console.error('Lead capture error:', error);
    res.status(500).json({ error: 'Failed to process lead' });
  }
});

// GET /api/leads - Get all leads (Admin only - for future use)
router.get('/', (req, res) => {
  const { status = 'new', carId, limit = 50, offset = 0 } = req.query;

  let query = `
    SELECT l.*, c.title as carTitle, c.brand as carBrand, c.price as carPrice
    FROM lead_captures l
    LEFT JOIN cars c ON l.carId = c.id
    WHERE l.status = ?
  `;
  const params = [status];

  if (carId) {
    query += ' AND l.carId = ?';
    params.push(carId);
  }

  query += ' ORDER BY l.createdAt DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch leads' });
    }

    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  });
});

// PUT /api/leads/:id/status - Update lead status (Admin only)
router.put('/:id/status', [
  body('status').isIn(['new', 'contacted', 'interested', 'not_interested', 'converted']).withMessage('Invalid status')
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

  db.run('UPDATE lead_captures SET status = ? WHERE id = ?', [status, id], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to update status' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json({
      success: true,
      message: 'Status updated successfully'
    });
  });
});

// Helper function to send lead email
const sendLeadEmail = async ({ 
  leadId, 
  carId, 
  carTitle, 
  carBrand, 
  carPrice, 
  name, 
  email, 
  phone, 
  message 
}) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_FROM, // Send to yourself
    subject: `New Lead Capture #${leadId} - ${carTitle}`,
    html: `
      <h2>New Lead Capture</h2>
      <p><strong>Lead ID:</strong> ${leadId}</p>
      <p><strong>Car ID:</strong> ${carId}</p>
      <p><strong>Car:</strong> ${carTitle}</p>
      <p><strong>Brand:</strong> ${carBrand}</p>
      <p><strong>Price:</strong> ${carPrice}</p>
      <hr>
      <p><strong>Customer Details:</strong></p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message || 'No message provided'}</p>
      <hr>
      <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
    `
  };

  // Send auto-reply to customer
  const autoReplyOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Thank you for your interest in ${carTitle}`,
    html: `
      <h2>Thank you for your interest!</h2>
      <p>Dear ${name},</p>
      <p>Thank you for your interest in the <strong>${carTitle}</strong>.</p>
      <p>Our team will contact you within 24 hours to discuss this vehicle and answer any questions you may have.</p>
      <p><strong>Vehicle Details:</strong></p>
      <ul>
        <li><strong>Vehicle:</strong> ${carTitle}</li>
        <li><strong>Brand:</strong> ${carBrand}</li>
        <li><strong>Price:</strong> ${carPrice}</li>
      </ul>
      <p><strong>Your Lead ID:</strong> ${leadId}</p>
      <hr>
      <p>Best regards,<br>Innovolt Team</p>
    `
  };

  await transporter.sendMail(mailOptions);
  await transporter.sendMail(autoReplyOptions);
};

module.exports = router;
