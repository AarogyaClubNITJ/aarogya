const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rollNo: { type: String, required: true },
  phoneNo: { type: String, required: true },
  instaHandle: String,
  score: { type: Number, default: 0 },
  timeTaken: { type: Number, default: 0 }, // in milliseconds
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
