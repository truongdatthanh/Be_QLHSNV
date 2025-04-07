const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  baseSalary: Number
});

module.exports = mongoose.model('Position', PositionSchema);