const nodemailer = require("nodemailer");
const path = require("path");  
const fs = require('fs');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendInterviewEmail = async (to, subject, text, filePath) => {
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to,
    subject,
    text,
    attachments: filePath ? [{
      filename: path.basename(filePath),
      path: filePath
    }] : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendInterviewEmail;
