const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/by-university-id/:universityId', (req, res) => {
	const { universityId } = req.params;

	const user = db.prepare(`
    SELECT id, university_id, name
    FROM users
    WHERE university_id = ?
  `).get(universityId);

	if (!user) {
		return res.status(404).json({
			error: 'User not found'
		});
	}

	res.json({
		user_id: user.id,
		university_id: user.university_id,
		name: user.name
	});
});

// GET /api/users/:id/bookings

router.get('/:id/bookings', (req, res) => {
	const userId = req.params.id;
	const userExists = db.prepare(
		`SELECT 1 FROM users WHERE id = ?`
	).get(userId);

	if (!userExists) {
		return res.status(404).json({ error: 'User not found' });
	}

	const bookings = db.prepare(`
    SELECT
      b.id,
      b.booth_id,
      bo.booth_code,
      b.start_time,
      b.end_time,
      b.status,
      b.extended,
      b.created_at
    FROM bookings b
    JOIN booths bo ON bo.id = b.booth_id
    WHERE b.user_id = ?
    ORDER BY b.start_time DESC
  `).all(userId);

	res.json(bookings);
});


module.exports = router;
