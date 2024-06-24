const express = require("express");
const { InterviewScheduleController, GetCandidate} = require("../../controller/InterviewSchedule/InterViewShedule");
const { FeedbackController } = require("../../controller/InterviewSchedule/FeedbackController");
const InterviewSheduleRoute=express.Router();

InterviewSheduleRoute.post('/schedule-interview',InterviewScheduleController)
InterviewSheduleRoute.get('/getCandidate',GetCandidate)
InterviewSheduleRoute.post('/send-feedback',FeedbackController)

module.exports ={InterviewSheduleRoute};