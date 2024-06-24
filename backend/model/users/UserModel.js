const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  conf_password: {
    type: String,
  },
  phone_number: {
    type: String,
    unique: true,
    sparse: true
  },
  dob: {
    type: Date,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  college: {
    type: String,
  },
  course: {
    type: String,
  },
  course_start_date: {
    type: Date,
  },
  experience: {
    type: String
  },
  course_end_date: {
    type: Date,
  },
  percentage: {
    type: Number,
  },
  job_title: {
    type: String,
  },
  company: {
    type: String,
  },
  company_start_date: {
    type: Date,
  },
  company_end_date: {
    type: Date,
  },
  gender: {
    type: String
  },
  website: {
    type: String
  },
  marital_status: {
    type: String
  },
  profileImage: {
    type: String,
  },
  biography: {
    type: String,
  },
  skills: [
    {
      name: { type: String },
      index: { type: Number },
    },
  ],
  note: {
    type: String,
  },
  resume: [
    {
      filename: String,
      url: String,
      public_id: String,
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  userType: {
    type: String,
  },
  userAppliedJob: [
    {
      jobID: {
        type: String,
      },
      appliedAt: {
        type: Date,
        default: Date.now
      }
    },
  ],
  
  userSavedJob: [
    {
      jobID: {
        type: String,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
