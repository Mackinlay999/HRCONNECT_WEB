const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    test: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    question: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);


const assessmentCollection = mongoose.model('assessments', assessmentSchema);

module.exports = assessmentCollection;
