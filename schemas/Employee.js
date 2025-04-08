const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employeeCode: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  gender: String,
  birthDate: Date,
  idCardNumber: String,
  idCardIssueDate: Date,
  address: String,
  phoneNumber: String,
  email: String,
  maritalStatus: String,
  department: { type: mongoose.Types.ObjectId, ref: 'Department' },
  position: { type: mongoose.Types.ObjectId, ref: 'Position' },
  status: { type: String, default: 'Working' } ,
  cvFile: { type: String }
});

module.exports = mongoose.model('Employee', EmployeeSchema);