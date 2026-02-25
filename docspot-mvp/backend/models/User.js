const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },   // ✅ must be "password"
  role: { type: String, enum: ['customer', 'doctor'], default: 'customer' }
});

module.exports = mongoose.model('User', UserSchema);