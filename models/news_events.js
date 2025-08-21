const mongoose = require('mongoose');

const NewsEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['news', 'events'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  linkedin_url: {
    type: String, // no validation, just plain string
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('NewsEvent', NewsEventSchema);
