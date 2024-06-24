
const nodemailer = require('nodemailer');
const dotenv=require('dotenv');
dotenv.config()
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const FeedbackController = async (req, res) => {
    const { candidateName, candidateEmail, feedback } = req.body;
  
    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: candidateEmail,
      subject: 'Interview Feedback',
      text: `Hello ${candidateName},\n\n${feedback}\n\nBest regards,\nYour Company`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send feedback email.' });
      }
      console.log('Email sent:', info.response);
      res.status(200).json({ success: true, message: 'Feedback sent successfully!' });
    });
  };
  
module.exports ={FeedbackController};
