PRAGMA foreign_keys = ON;

--------------------------------------------------
-- STAFF
--------------------------------------------------
CREATE TABLE staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, -- plaintext acceptable for coursework
    role TEXT NOT NULL CHECK (role IN ('staff', 'admin')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- USERS
--------------------------------------------------
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    university_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,

    is_banned INTEGER NOT NULL DEFAULT 0,
    banned_until DATETIME,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------
-- BOOTHS
--------------------------------------------------
CREATE TABLE booths (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booth_code TEXT UNIQUE NOT NULL,
    location TEXT,
    is_active INTEGER NOT NULL DEFAULT 1
);

--------------------------------------------------
-- LIBRARY OPENING HOURS
--------------------------------------------------
CREATE TABLE library_hours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    weekday INTEGER NOT NULL CHECK (weekday BETWEEN 0 AND 6),
    open_time TIME NOT NULL,
    close_time TIME NOT NULL,
    is_closed INTEGER NOT NULL DEFAULT 0,

    UNIQUE (weekday)
);

--------------------------------------------------
-- BOOKINGS
--------------------------------------------------
CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,
    booth_id INTEGER NOT NULL,

    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,

    status TEXT NOT NULL CHECK (
        status IN ('active', 'cancelled', 'completed', 'no_show')
    ),

    checked_in_at DATETIME,
    extended INTEGER NOT NULL DEFAULT 0,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (booth_id) REFERENCES booths(id) ON DELETE CASCADE,

    CHECK (end_time > start_time)
);

--------------------------------------------------
-- BOOKING EVENTS 
--------------------------------------------------
CREATE TABLE booking_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    booking_id INTEGER NOT NULL,
    event_type TEXT NOT NULL CHECK (
        event_type IN (
            'created',
            'checked_in',
            'extended',
            'cancelled',
            'no_show',
            'auto_cancel'
        )
    ),

    event_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,

    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

--------------------------------------------------
-- INDEXES
--------------------------------------------------

CREATE INDEX idx_bookings_user_day
ON bookings (user_id, DATE(start_time));

CREATE INDEX idx_bookings_booth_time
ON bookings (booth_id, start_time, end_time);

CREATE INDEX idx_bookings_status
ON bookings (status);

-- Initial data for library hours
INSERT INTO library_hours (weekday, open_time, close_time, is_closed) VALUES
(0, '08:00', '22:00', 0),
(1, '08:00', '22:00', 0),
(2, '08:00', '22:00', 0),
(3, '08:00', '22:00', 0),
(4, '08:00', '22:00', 0),
(5, '10:00', '18:00', 0),
(6, '12:00', '16:00', 0);
-- Initial admin user
INSERT INTO staff (username, password, role)
VALUES
('staff', 'password', 'staff'),
('admin', 'password', 'admin');
-- Initial booths
INSERT INTO booths (booth_code, location, is_active) VALUES
('DHB', 'David Hockney Building', 1),
('TG', 'Trinity Green Building', 1);

-- Initial users
INSERT INTO users (university_id, name) VALUES
('u123456', 'John Smith'),
('u123457', 'Test User');



