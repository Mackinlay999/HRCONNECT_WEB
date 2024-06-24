const Hr = require("../../model/users/HrUserModel");
const Otp = require("../../model/Otp");
const sendOtpEmail = require("../../services/recruiterEmailService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { uploadonCloudinary } = require("../../utility/cloudinary");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const getHR = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await Hr.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({hrDetails: user, success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const checkEmail = async (req, res) => {
  const { email } = req.body;
  const user = await Hr.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email already registered" });
  }
  res.status(200).json({ message: "Email is available" });
};

const requestOtp = async (req, res) => {
  const { email } = req.body;
  // console.log('Request received to send OTP to:', email);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // console.log('Generated OTP:', otp);

  // Remove any existing OTP for this email
  await Otp.findOneAndDelete({ email });
  const newOtp = new Otp({ email, otp });
  await newOtp.save();

  try {
    // console.log('Calling sendOtpEmail...');
    await sendOtpEmail(email, otp);
    // console.log('OTP email sent successfully.');
    res.status(200).json({ msg: "OTP sent" });
  } catch (error) {
    console.error("Failed to send OTP:", error);
    res.status(500).json({ msg: "Failed to send OTP", error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const otpRecord = await Otp.findOne({ email, otp });

  if (!otpRecord) {
    return res.status(400).json({ msg: "Invalid OTP" });
  }

  await Otp.findOneAndDelete({ email, otp });
  res.status(200).json({ msg: "OTP verified" });
};

const signUp = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      companyName,
      aboutCompany,
      companyAddress,
      companyWebsite,
    } = req.body;

    // Check if email is already registered
    const existingHr = await Hr.findOne({ email });
    if (existingHr) {
      return res
        .status(400)
        .json({ message: `${email} is already registered` });
    }

    // Validate email domain
    const domain = email.split("@")[1];
    const genericDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
    ];
    if (genericDomains.includes(domain)) {
      return res
        .status(400)
        .json({ message: "Please use your company email address" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new HR
    const newHr = new Hr({
      name,
      email,
      password: hashedPassword,
      companyName: req.body.companyName || "",
      aboutCompany: req.body.aboutCompany || "",
      companyAddress: req.body.companyAddress || "",
      companyWebsite: req.body.companyWebsite || "",
    });
    await newHr.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newHr._id }, SECRET_KEY, {
      expiresIn: "2d",
    });

    return res.status(201).json({
      message: `${name} your account is created successfully`,
      token,
      name,
      email,
      bookmarkUser: [],
      userType: "employee",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email domain
    const domain = email.split("@")[1];
    const genericDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
    ];
    if (genericDomains.includes(domain)) {
      return res
        .status(400)
        .json({ message: "Please use your company email address" });
    }

    // Check if user exists
    const hr = await Hr.findOne({ email });
    if (!hr) {
      return res.status(404).json({ message: "No HR Found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, hr.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: hr._id }, SECRET_KEY, { expiresIn: "2d" });

    return res.status(201).json({
      message: `${hr.name} you have successfully logged In`,
      token,
      name: hr.name,
      email: hr.email,
      bookmarkUser: hr.bookmarkUser,
      userType: "employee",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const hr = await Hr.findOne({ email });

    if (!hr) {
      return res.json({ message: "HR is not registered" });
    }

    const token = jwt.sign({ userId: hr._id }, SECRET_KEY, { expiresIn: "5m" });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: "Reset Password",
      html: `<p>Click <a href="${process.env.CLIENT_URL}/hr/reset-password/${token}">here</a> to reset your password.</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({
          status: true,
          message: "Error occurred while sending an email",
        });
      } else {
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = await jwt.verify(token, SECRET_KEY);
    const hrId = decoded.userId;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the HR's password
    await Hr.findByIdAndUpdate(hrId, { password: hashedPassword });

    return res.status(200).json({ message: "Password Reset Successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const HRupdateUserField = async (req, res) => {
  try {
    const { email } = req.params;
    const updateFields = {};

    // Check if a file is uploaded
    if (req.file) {
      const result = await uploadonCloudinary(req.file.buffer, req.file.originalname);
      req.body.profileImage = result?.secure_url;
    }

    if (req.body.skills) {
      req.body.skills = req.body.skills
        .split(",")
        .map((skill, index) => ({ name: skill.trim(), index }));
    }

    for (const key in req.body) {
      if (
        req.body[key] !== "null" &&
        req.body[key] !== "" &&
        req.body[key] !== " " &&
        req.body[key]
      ) {
        updateFields[key] = req.body[key];
      }
    }

    const findUser = await Hr.findOneAndUpdate({ email }, updateFields, {
      new: true,
    });

    if (findUser) {
      res.status(200).json({
        success: true,
        msg: "Hr details updated successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        msg: "No Hr found to update",
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Delete HR
const deleteHR = async (req, res) => {
  try {
    const { email } = req.params;
    const deleteHr = await Hr.deleteOne({ email });
    if (deleteHr.deletedCount) {
      res.send({
        success: true,
        msg: "Account deleted successfully"
      })
    }
    else {
      res.send({
        success: false,
        msg: "Account not found !!"
      })
    }
  } catch (err) {
    res.status(401).json({ success: false }, err);
  }
}

module.exports = {
  checkEmail,
  getHR,
  requestOtp,
  verifyOtp,
  signUp,
  login,
  forgotPassword,
  resetPassword,
  HRupdateUserField,
  deleteHR
};
