const mongoose = require('mongoose');

const RewardPunishmentSchema = new mongoose.Schema({
  employee: { type: mongoose.Types.ObjectId, ref: 'Employee' },
  type: String, 
  reason: String,
  date: Date,
  note: String
});

module.exports = mongoose.model('RewardPunishment', RewardPunishmentSchema);