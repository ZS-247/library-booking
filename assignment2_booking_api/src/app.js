const express = require('express');
const bookings = require('./routes/bookings');
const users = require('./routes/users');
const cors = require('cors');
const path = require('path')
const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});

//app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/api/bookings', bookings);
app.use('/api/users', users);
app.listen(3000, () => {
	console.log('Library booking API running on port 3000');
});
