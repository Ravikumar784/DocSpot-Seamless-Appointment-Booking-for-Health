const mongoose = require('mongoose');
const DoctorSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  specialty: String,
  location: String,
  approved: {type:Boolean, default:false}
});
module.exports = mongoose.model('Doctor', DoctorSchema);