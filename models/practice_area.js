const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const practiceAreaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PracticeArea', practiceAreaSchema);
