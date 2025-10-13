const express = require('express');
const router = express.Router();
const { db } = require('../models/database');
const { body, validationResult } = require('express-validator');

// GET /api/cars - Get all cars with optional filtering
router.get('/', (req, res) => {
  const { location, brand, year, minPrice, maxPrice, sortBy = 'createdAt', order = 'DESC' } = req.query;
  
  let query = 'SELECT * FROM cars WHERE status = "active"';
  const params = [];

  // Add filters
  if (location) {
    query += ' AND location LIKE ?';
    params.push(`%${location}%`);
  }
  
  if (brand) {
    query += ' AND brand LIKE ?';
    params.push(`%${brand}%`);
  }
  
  if (year) {
    query += ' AND year = ?';
    params.push(year);
  }

  // Add sorting
  const allowedSortFields = ['createdAt', 'price', 'year', 'kilometers'];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
  const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  
  query += ` ORDER BY ${sortField} ${sortOrder}`;

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch cars' });
    }

    // Parse images JSON for each car
    const cars = rows.map(car => ({
      ...car,
      images: car.images ? JSON.parse(car.images) : []
    }));

    res.json({
      success: true,
      data: cars,
      count: cars.length
    });
  });
});

// GET /api/cars/:id - Get single car by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM cars WHERE id = ? AND status = "active"', [id], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch car' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Car not found' });
    }

    // Parse images JSON
    const car = {
      ...row,
      images: row.images ? JSON.parse(row.images) : []
    };

    res.json({
      success: true,
      data: car
    });
  });
});

// POST /api/cars - Create new car (Admin only - for future use)
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('price').notEmpty().withMessage('Price is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('brand').notEmpty().withMessage('Brand is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array()
    });
  }

  const {
    title, image, kilometers, owners, price, emi, location, brand, year,
    registrationYear, vehicleNumber, spareKey, spareWheel, chargerAvailable,
    batteryCondition, toolKitAvailable, images
  } = req.body;

  const query = `
    INSERT INTO cars (
      title, image, kilometers, owners, price, emi, location, brand, year,
      registrationYear, vehicleNumber, spareKey, spareWheel, chargerAvailable,
      batteryCondition, toolKitAvailable, images
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const imagesJson = Array.isArray(images) ? JSON.stringify(images) : images || '[]';

  db.run(query, [
    title, image, kilometers, owners, price, emi, location, brand, year,
    registrationYear, vehicleNumber, spareKey, spareWheel, chargerAvailable,
    batteryCondition, toolKitAvailable, imagesJson
  ], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to create car' });
    }

    res.status(201).json({
      success: true,
      message: 'Car created successfully',
      data: { id: this.lastID }
    });
  });
});

// PUT /api/cars/:id - Update car (Admin only - for future use)
router.put('/:id', [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('price').optional().notEmpty().withMessage('Price cannot be empty')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array()
    });
  }

  const { id } = req.params;
  const updateFields = [];
  const values = [];

  // Build dynamic update query
  Object.keys(req.body).forEach(key => {
    if (req.body[key] !== undefined) {
      updateFields.push(`${key} = ?`);
      values.push(req.body[key]);
    }
  });

  if (updateFields.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  updateFields.push('updatedAt = CURRENT_TIMESTAMP');
  values.push(id);

  const query = `UPDATE cars SET ${updateFields.join(', ')} WHERE id = ?`;

  db.run(query, values, function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to update car' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.json({
      success: true,
      message: 'Car updated successfully'
    });
  });
});

// DELETE /api/cars/:id - Soft delete car (Admin only - for future use)
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('UPDATE cars SET status = "deleted", updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to delete car' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.json({
      success: true,
      message: 'Car deleted successfully'
    });
  });
});

module.exports = router;
