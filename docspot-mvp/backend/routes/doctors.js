const express = require('express');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const { specialty, location } = req.query;
  const filter = {};
  if (specialty) filter.specialty = specialty;
  if (location) filter.location = location;
  const docs = await Doctor.find(filter).populate('user', 'name email');
  res.json(docs);
});

router.post('/apply', auth, async (req, res) => {
  try {
    const { specialty, location } = req.body;
    const existing = await Doctor.findOne({ user: req.user._id });
    if (existing) return res.status(400).json({ message: 'Already applied' });
    const doc = await Doctor.create({ user: req.user._id, specialty, location, approved: false });
    await User.findByIdAndUpdate(req.user._id, { role: 'doctor' });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;