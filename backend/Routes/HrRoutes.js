const HrRoutes = require("express").Router();

const {
    getHR,
    checkEmail,
    requestOtp,
    verifyOtp,
    signUp,
    login,
    forgotPassword,
    resetPassword,
    HRupdateUserField,
    deleteHR
} = require("../controller/auth/HrAuthController");
const { upload, uploadProfile } = require("../middleware/fileUploadMiddleware");

HrRoutes.get("/get-hr", getHR);
HrRoutes.post("/check-Email", checkEmail);
HrRoutes.post("/request-otp", requestOtp);
HrRoutes.post("/verify-otp", verifyOtp);
HrRoutes.post("/signup", upload, signUp);
HrRoutes.post("/login", login);
HrRoutes.post("/forgot-password", forgotPassword);
HrRoutes.post("/reset-password/:token", resetPassword);
HrRoutes.patch("/update-hr/:email", uploadProfile, HRupdateUserField);
HrRoutes.delete("/delete-hr/:email", deleteHR)

module.exports = HrRoutes;
