-- staff schema 
PRAGMA foreign_keys = ON;

CREATE TABLE staff (
    staff_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,         -- plaintext for simplicity. We WOULD NOT use this in a real system.
    role TEXT NOT NULL CHECK (role IN ('staff', 'admin')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Initial accounts
INSERT INTO staff (username, password, role)
VALUES
('staff', 'password', 'staff'),
('admin', 'password', 'admin');
