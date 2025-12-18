const Database = require('better-sqlite3');
const dbPath = process.env.DB_PATH || '../library.db'; // default to 'library.db'

const db = new Database(dbPath, {
	foreignKeys: true
});

module.exports = db;
