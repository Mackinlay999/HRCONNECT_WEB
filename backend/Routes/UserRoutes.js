const userRoutes = require("express").Router();
const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  getUser,
  updateUserField,
  logout,
  checkEmail,
  checkPhoneNumberExists,
  requestOtp,
  verifyOtp,
  deleteUser,
} = require("../controller/auth/AuthController");
const { upload, uploadProfile } = require("../middleware/fileUploadMiddleware");
const {
  getHalfHourlyLoginFrequency,
  getWeeklyLoginFrequency,
  getMonthlyLoginFrequency,
  getYearlyLoginFrequency,
  getHalfHourlyTimeSpent,
  getWeeklyTimeSpent,
  getMonthlyTimeSpent,
  getYearlyTimeSpent,
} = require("../controller/UserAnalytics/userAnalyticsController");

const {
  getJobApplicationAnalytics,
} = require("../controller/UserAnalytics/JobApplicationAnalytics");

const {recommendJobsForUser} = require("../controller/recommendationLogic")

userRoutes.get("/user", getUser);
userRoutes.post("/check-email", checkEmail);
userRoutes.post("/checkPhoneNumber", checkPhoneNumberExists);
userRoutes.post("/request-otp", requestOtp);
userRoutes.post("/verify-otp", verifyOtp);
userRoutes.post("/signup", upload, signUp); // Ensure 'upload' middleware is used here
userRoutes.post("/login", login);
userRoutes.post("/recommendations", recommendJobsForUser)
userRoutes.post("/logout", logout);
userRoutes.get("/analytics/login-frequency/half-hourly", getHalfHourlyLoginFrequency);
userRoutes.get("/analytics/login-frequency/weekly", getWeeklyLoginFrequency);
userRoutes.get("/analytics/login-frequency/monthly", getMonthlyLoginFrequency);
userRoutes.get("/analytics/login-frequency/yearly", getYearlyLoginFrequency);
userRoutes.get("/analytics/time-spent/half-hourly", getHalfHourlyTimeSpent);
userRoutes.get("/analytics/time-spent/weekly", getWeeklyTimeSpent);
userRoutes.get("/analytics/time-spent/monthly", getMonthlyTimeSpent);
userRoutes.get("/analytics/time-spent/yearly", getYearlyTimeSpent);
userRoutes.get("/analytics/job-application", getJobApplicationAnalytics);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/reset-password/:token", resetPassword);
userRoutes.patch("/update-user/:email", uploadProfile, updateUserField);
userRoutes.delete("/delete-user/:email", deleteUser);

module.exports = userRoutes;
