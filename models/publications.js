const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema(
  {
    practice_area: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'PracticeArea',              
      required: true,
    },
    published_on: {
      type: Date,
      required: true,
    },
    authors: {
      type: [String],
      default: [],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    link: {
      type: String,
      default: '',
      trim: true,
      required:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Publication', publicationSchema);
