# Library Booth Booking System

**Library Booth Booking System** consists of a backend API served with **Express.js** and a frontend that makes use off **Tailwind CSS** and is served statically via Nginx. The system allows students to book, view, and manage library booth reservations.

---
## Demo
The completed project is currently availible at https://website-assignment.zakarya.me/ and this repository is currently hosted at https://git.zakarya.me/zakarya/Library-Booking-System. 
In adddition, it is permanently availible at https://github.com/ZS-247/library-booking. 
<img width="641" height="267" alt="image" src="https://github.com/user-attachments/assets/c4d11d9a-2ca6-45eb-b1c7-e5887eaabaf9" />
Visit [here](https://website-assignment.zakarya.me/staff-login.html) for staff demo.
<img width="1074" height="393" alt="image" src="https://github.com/user-attachments/assets/f19a11be-f13b-47e5-bfb1-985662d61257" />
Or [here](https://website-assignment.zakarya.me/my-bookings.html) for student demo. 

The demo database contains was given the following for demonstration and testing purposes:
```
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
```

## Project Structure

```
assignment2_booking_api/   # Express.js backend API
public/                     # Frontend static pages
```

### assignment2_booking_api/
- Implements API for booths, and bookings
- Uses SQLite3 for storage
- Endpoints include:
  - `POST /api/bookings` - create a new booking
  - `GET /api/users/:id/bookings` - list a user's bookings

### public/
- Contains frontend pages:
  - `identify-user.html` - student login via university ID
  - `booking.html` - book a booth 
  - `my-bookings.html` - view current and upcoming bookings
  - `staff-dashboard.html` - allows staff to view but only admins to manage bookings from all students 
  - `staff-login.html` - manages staff authentication. 


## Setup Instructions

### Backend

1. Navigate to the backend folder:
   ```bash
   cd assignment2_booking_api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initializes sqlite db.
   ```bash
   sqlite3 bookings.db < schema.sql
   ```
4. Start the API:
   ```bash
   node app.js
   ```
   - Or use (pm2)[https://pm2.keymetrics.io/docs/usage/quick-start/] 
   ```bash
   pm2 start src/app.js
   ```
   other alternatives include creating a systemd service or using screen or tmux.

### Frontend

1. Move the `public/` directory into the appropriet location to be served by your webserver (such as /var/www/html)
2. Ensure the api is being served and is accesible on the same host at /api/
3. Sites is now functioning correctly

---

## Usage
### regular usage
1. Navigate to `index.html` or `/`
2. Enter university ID and select **Make Booking** or **View Bookings**. In the demo, the id's u123456 and u123457 will work.
3. On the booking page select a booth, date, start time, and end time.
4. If successful, you will be redirected to view your current bookings.
### Staff and Admin
1. Navigate to `staff-dashboard.html`
2. Enter credentials for staff or admin users. By default, `admin` and `password` or  `staff` and `password`.
3. If successful, staff can view all bookings but only admins will be able to cancel them.
4. After canceling a student booking the booking will show as cancelled when the student views `/my-bookings.html`
---

## Technologies Used

- **Backend:** Node.js, Express.js, SQLite3
- **Frontend:** HTML, Tailwind CSS, JavaScript
- **Server:** Nginx (reverse proxy + static file serving)

---

## Notes

- Time inputs are dropdowns in 30-minute increments for better usability
- Users can only book once per day, up to one week in advance
- Staff password's are not hashed and stored in plaintext. If deployed in a production environment changes to authentication would be a necessity, however, this project aims to serve as a prototype for demonstration
--



