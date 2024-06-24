const nodemailer = require('nodemailer');

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error configuring transporter:', error);
  } else {
    console.log('Server is ready to take our messages hr side:', success);
  }
});

  // Function to send OTP email
  const sendOtpEmail = async (email, otp) => {
    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code as recruiter for HRCONNECT PRO is ${otp}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send OTP email');
    }
  };

  module.exports = sendOtpEmail;
