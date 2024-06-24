const mongoose = require("mongoose");

const interviewVideoSchema = new mongoose.Schema({
  name: String,
  url: String,
  cloudinary_is: String,
  description: String,
});

const interviewVideoUpload = mongoose.model(
  "interviewVideoUpload",
  interviewVideoSchema
);

module.exports = interviewVideoUpload;
