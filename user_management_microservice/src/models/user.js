const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address_line_1: {
    type: String,
    required: true
  },
  address_line_2: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: true
  },
  postal_code: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
  }
});


module.exports = mongoose.model("User", userSchema);

