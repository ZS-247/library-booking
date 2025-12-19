const Database = require('better-sqlite3');
const dbPathStaff = process.env.DB_PATH_STAFF || '../staff.db';

const staffDb = new Database(dbPathStaff);

module.exports = staffDb;
