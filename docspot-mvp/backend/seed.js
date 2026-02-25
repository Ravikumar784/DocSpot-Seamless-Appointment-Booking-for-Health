// backend/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Doctor = require('./models/Doctor');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/docspot';

async function connect() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB for seeding');
}

async function seed() {
  await connect();

  // Clear existing data
  await User.deleteMany();
  await Doctor.deleteMany();

  // Create users
  const adminUser = new User({
    email: 'admin@docspot.test',
    passwordHash: await bcrypt.hash('adminpass', 10),
    role: 'admin'
  });

  const doctorUser = new User({
    email: 'drsmith@docspot.test',
    passwordHash: await bcrypt.hash('doctorpass', 10),
    role: 'doctor'
  });

  const customerUser = new User({
    email: 'john@docspot.test',
    passwordHash: await bcrypt.hash('custpass', 10),
    role: 'customer'
  });

  await adminUser.save();
  await doctorUser.save();
  await customerUser.save();

  // Create doctor profile linked to doctor user
  const doctorProfile = new Doctor({
    user: doctorUser._id,
    specialty: 'Cardiology',
    location: 'Hyderabad'
  });

  await doctorProfile.save();

  console.log('Seeded users and doctor profile');
  mongoose.disconnect();
}

seed();