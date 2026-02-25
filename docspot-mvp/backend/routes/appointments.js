const express = require('express');
const multer = require('multer');
const path = require('path');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ✅ Book appointment
router.post('/', auth, upload.single('document'), async (req, res) => {
  try {
    const { doctorId, slotStart } = req.body;
    if (!doctorId || !slotStart) return res.status(400).json({ message: 'Missing fields' });

    const doctor = await Doctor.findById(doctorId);
    if (!doctor || !doctor.approved) return res.status(400).json({ message: 'Invalid doctor' });

    const appt = await Appointment.create({
      customer: req.user._id,
      doctor: doctor._id,
      slotStart: new Date(slotStart),
      documentPath: req.file ? `/uploads/${req.file.filename}` : undefined
    });

    res.status(201).json(appt);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Fetch appointments for logged-in user
router.get('/mine', auth, async (req, res) => {
  try {
    const { role } = req.user;

    if (role === 'doctor') {
      // doctor sees appointments for their patients
      const doc = await Doctor.findOne({ user: req.user._id });
      if (!doc) return res.json([]);
      const appts = await Appointment.find({ doctor: doc._id })
        .populate('customer', 'name email')
        .sort('-createdAt');
      return res.json(appts);
    } else {
      // customer sees their own appointments
      const appts = await Appointment.find({ customer: req.user._id })
        .populate('doctor')
        .sort('-createdAt');
      return res.json(appts);
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Update appointment status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const appt = await Appointment.findById(req.params.id).populate('doctor');
    if (!appt) return res.status(404).json({ message: 'Not found' });

    const doc = await Doctor.findById(appt.doctor);
    if (!doc) return res.status(403).json({ message: 'Forbidden' });

    // allow doctor or admin to change
    if (req.user.role !== 'admin' && String(doc.user) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    appt.status = status;
    await appt.save();
    res.json(appt);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;