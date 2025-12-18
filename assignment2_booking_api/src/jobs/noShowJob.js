

const db = require('../db');
const cron = require('node-cron');

cron.schedule('*/5 * * * *', () => {
	const rows = db.prepare(`
    UPDATE bookings
    SET status = 'no_show'
    WHERE status = 'active'
      AND checked_in_at IS NULL
      AND datetime('now') > datetime(start_time, '+15 minutes')
  `).run();

	if (rows.changes > 0) {
		console.log(`Auto-cancelled ${rows.changes} no-show bookings`);
	}
});
