const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
  employee: { type: mongoose.Types.ObjectId, ref: 'Employee' },
  contractType: String,
  startDate: Date,
  endDate: Date,
  salary: Number
});

module.exports = mongoose.model('Contract', ContractSchema);