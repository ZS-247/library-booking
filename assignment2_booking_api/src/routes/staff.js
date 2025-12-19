const express = require('express');
const router = express.Router();
const db = require('../db');         // library.db
 


// POST /api/staff/login 
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const staff = db.prepare(`
    SELECT id, role
    FROM staff
    WHERE username = ? AND password = ?
  `).get(username, password);

  if (!staff) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({
    staff_id: staff.id,
    role: staff.role
  });
});

// GET /api/staff/bookings 
router.get('/bookings', (req, res) => {
  const bookings = db.prepare(`
    SELECT
      b.id AS booking_id,
      u.university_id,
      bo.booth_code,
      b.start_time,
      b.end_time,
      b.status
    FROM bookings b
    JOIN users u ON u.id = b.user_id
    JOIN booths bo ON bo.id = b.booth_id
    ORDER BY b.start_time
  `).all();

  res.json(bookings);
});

// DELETE /api/staff/bookings/:id (admin only) 
router.delete('/bookings/:id', (req, res) => {
  if (req.headers['x-staff-role'] !== 'admin') {
    return res.status(403).json({ error: 'Admin privileges required' });
  }

  const result = db.prepare(`
    UPDATE bookings
    SET status = 'cancelled'
    WHERE id = ?
  `).run(req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  res.json({ success: true });
});

module.exports = router;
