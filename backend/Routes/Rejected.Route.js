const RejectedRoute = require('express').Router();
const{ getRejected, createReject, removeRejected}=require('../controller/Rejected.controller')
RejectedRoute.post("/create-reject/:HrEmail", createReject)
RejectedRoute.get("/get-rejected/:HrEmail", getRejected)
RejectedRoute.delete("/delete-reject/:HrEmail", removeRejected);

module.exports = { RejectedRoute }