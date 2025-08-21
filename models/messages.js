const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  agreement: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
