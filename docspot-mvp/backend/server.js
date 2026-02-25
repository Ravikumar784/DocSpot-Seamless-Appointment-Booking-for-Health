// backend/server.js
require('dotenv').config();
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);
const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./src/config/db');

const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctors');
const apptRoutes = require('./routes/appointments');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', require('./routes/appointments'));

const PORT = process.env.PORT || 5001;

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const server = app.listen(PORT, () => console.log(`Backend running on ${PORT}`));

    const gracefulShutdown = () => {
      console.log('Shutting down server...');
      server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
      setTimeout(() => process.exit(1), 10000);
    };

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
  } catch (err) {
    console.error('Failed to start server due to DB error', err);
    process.exit(1);
  }
})();