const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Job',              
      required: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    graduated_from: {
      type: String,
      default:'',
      trim: true,
    },
    percentage_of_grade: {
      type: Number,
      default:0,   
     
    },
    current_employer: {
      type: String,
      default: '',
      trim: true,
    },
    current_designation: {
      type: String,
      default: '',
      trim: true,
    },
    college: {
      type: String,
      default: '',
      trim: true,
    },
    current_year_in_college: {
      type: Number,
      default: 1,
    },
    location_preference: {
      type: String,
      required: true,  
      trim: true,
    },
    availability: {
      type: Date,  
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
