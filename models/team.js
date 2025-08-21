
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
    },
    expertise: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PracticeArea', 
      },
    ],
    contacts: {
      type: [String], 
      default: [],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    bio: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    location: {
      type: [String],
      required:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Team', TeamSchema);
