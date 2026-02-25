// backend/src/config/db.js
const mongoose = require('mongoose');

const connectDB = async (uri) => {
  if (!uri) throw new Error('MONGO_URI is not defined');

  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  try {
    await mongoose.connect(uri, opts);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });
  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
  });

  return mongoose.connection;
};

module.exports = connectDB;