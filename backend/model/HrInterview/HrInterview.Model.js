const mongoose = require("mongoose");

const HrInterviewSchema = new mongoose.Schema({
  hrquestion: {
    type: String,
    required: true,
  },
});

const HrInterview = mongoose.model("HrInterview", HrInterviewSchema);

module.exports = HrInterview;
