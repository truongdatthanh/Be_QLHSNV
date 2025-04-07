const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  employee: { type: mongoose.Types.ObjectId, ref: 'Employee' },
  degree: String,
  major: String,
  school: String,
  graduationYear: Number
});

module.exports = mongoose.model('Education', EducationSchema);