const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  rollNo: String,
  instaHandle: String,
  score: { type: Number, default: 0 },
  timeTaken: { type: Number, default: 0 }, // in milliseconds
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
