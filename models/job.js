const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  practices: {
    type: String,
    default: "",
    trim: true
  },
  experience: {
    type: Number,
    default: 0
  },
  locations: {
    type: [String],
    required: true
  },
  requirements: {
    type: [String],
    required: true
  },
  category: {
    type: String,
    enum: ["legal_professionals", "management_professionals", "internship"],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
