# Library Booth Booking System

**Library Booth Booking System** consists of a backend API served with **Express.js** and a frontend that makes use off **Tailwind CSS** and is served statically via Nginx. The system allows students to book, view, and manage library booth reservations.

---

## Project Structure

```
assignment2_booking_api/   # Express.js backend API
public/                     # Frontend static pages
```

### assignment2_booking_api/
- Implements API for booths, and bookings
- Uses SQLite3 for storage
- Endpoints include:
  - `GET /api/users/by-university-id/:university_id` - retrieve user ID
  - `POST /api/bookings` - create a new booking
  - `GET /api/users/:id/bookings` - list a user's bookings

### public/
- Contains frontend pages:
  - `identify-user.html` - student login via university ID
  - `booking.html` - book a booth (date, time, booth)
  - `my-bookings.html` - view current and upcoming bookings


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
3. Ensure SQLite database is initialized (schema.sql applied):
   ```bash
   sqlite3 bookings.db < schema.sql
   ```
4. Start the API:
   ```bash
   node src/app.js
   ```
   - Or use (pm2)[https://pm2.keymetrics.io/docs/usage/quick-start/] 
   ```bash
   pm2 start src/app.js
   ```

### Frontend

1. Place the `public/` folder under your web root (served by Nginx)
2. Configure Nginx to reverse proxy API requests to `assignment2_booking_api` if required
3. Access the frontend via your web browser

---

## Usage

1. Navigate to `identify-user.html`
2. Enter your university ID and click **Make Booking** or **View Bookings**
3. On the booking page, select a booth, date, start time, and end time, then submit
4. On the bookings page, view current and upcoming reservations

---

## Technologies Used

- **Backend:** Node.js, Express.js, SQLite3
- **Frontend:** HTML, Tailwind CSS, JavaScript
- **Server:** Nginx (reverse proxy + static file serving)

---

## Notes

- Time inputs are dropdowns in 30-minute increments for better usability
- Users can only book once per day, up to one week in advance
- Bookings are canceled automatically if the user is banned or doesn’t arrive on time

---



