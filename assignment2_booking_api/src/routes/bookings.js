const express = require('express');
const router = express.Router();
const bookingService = require('../services/bookingService');
//booking creation
router.post('/', (req, res) => {
	try {
		const id = bookingService.createBooking({
			userId: req.body.user_id,
			boothId: req.body.booth_id,
			startTime: req.body.start_time,
			endTime: req.body.end_time
		});

		res.status(201).json({ booking_id: id });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;
