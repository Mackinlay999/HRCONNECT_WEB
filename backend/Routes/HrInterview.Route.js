const HrInterviewRoutes = require("express").Router();
const HrInterview = require("../controller/HrInterview/HrInterview");
const { uploadHrQuestion } = require("../controller/HrInterview/HrInterview");
const storage = require("../utility/multer");

HrInterviewRoutes.post(
  "/uploadInterview",
  storage.single("file"),
  HrInterview.interviewUploadVideo
);

// upload / get interview question

HrInterviewRoutes.post("/post/HrInterviewRound", uploadHrQuestion);

HrInterviewRoutes.get("/HrInterviewRound", HrInterview.getHrQuestion);

module.exports = HrInterviewRoutes;
