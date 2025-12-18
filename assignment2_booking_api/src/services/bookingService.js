
const db = require('../db');
const dayjs = require('dayjs');


function assertUserNotBanned(userId) {
	const user = db.prepare(
		`SELECT is_banned, banned_until FROM users WHERE id = ?`
	).get(userId);

	if (!user) {
		throw new Error('User does not exist');
	}

	if (user.is_banned) {
		throw new Error('User is banned from booking booths');
	}
}


function assertWithinSevenDays(startTime) {
	if (dayjs(startTime).diff(dayjs(), 'day') > 7) {
		throw new Error('Bookings may only be made up to 7 days in advance');
	}
}

function assertMaxDuration(start, end) {
	if (dayjs(end).diff(dayjs(start), 'minute') > 120) {
		throw new Error('Booking exceeds 2 hour limit');
	}
}

function assertOneBookingPerDay(userId, startTime) {
	const exists = db.prepare(`
    SELECT 1 FROM bookings
    WHERE user_id = ?
      AND DATE(start_time) = DATE(?)
      AND status = 'active'
  `).get(userId, startTime);

	if (exists) {
		throw new Error('Only one booking per day is allowed');
	}
}

function assertBoothAvailable(boothId, start, end) {
	const conflict = db.prepare(`
    SELECT 1 FROM bookings
    WHERE booth_id = ?
      AND status = 'active'
      AND start_time < ?
      AND end_time > ?
  `).get(boothId, end, start);

	if (conflict) {
		throw new Error('Booth is already booked for this time');
	}
}

function assertLibraryOpen(start, end) {
	const weekday = dayjs(start).day();

	const hours = db.prepare(`
    SELECT open_time, close_time, is_closed
    FROM library_hours
    WHERE weekday = ?
  `).get(weekday);

	if (!hours || hours.is_closed) {
		throw new Error('Library is closed on this day');
	}

	const open = dayjs(`${dayjs(start).format('YYYY-MM-DD')} ${hours.open_time}`);
	const close = dayjs(`${dayjs(start).format('YYYY-MM-DD')} ${hours.close_time}`);

	if (dayjs(start).isBefore(open) || dayjs(end).isAfter(close)) {
		throw new Error('Booking outside library opening hours');
	}
}

function createBooking({ userId, boothId, startTime, endTime }) {
	assertUserNotBanned(userId);
	assertWithinSevenDays(startTime);
	assertMaxDuration(startTime, endTime);
	assertOneBookingPerDay(userId, startTime);
	assertBoothAvailable(boothId, startTime, endTime);
	assertLibraryOpen(startTime, endTime);

	const result = db.prepare(`
    INSERT INTO bookings (
      user_id, booth_id, start_time, end_time, status
    ) VALUES (?, ?, ?, ?, 'active')
  `).run(userId, boothId, startTime, endTime);

	db.prepare(`
    INSERT INTO booking_events (booking_id, event_type)
    VALUES (?, 'created')
  `).run(result.lastInsertRowid);

	return result.lastInsertRowid;
}

module.exports = {
	createBooking
};
