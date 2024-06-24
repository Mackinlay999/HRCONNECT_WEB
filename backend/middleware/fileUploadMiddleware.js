const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage to handle buffer directly
const storage = multer.memoryStorage();

// File filter to ensure only PDF files are uploaded
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

// Initialize multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // Limit file size to 2MB
  fileFilter: fileFilter
}).single('resume');

// Photo filter for image uploads
const photoFilter = (req, file, cb) => {
  if (file.mimetype.includes('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG/PNG files are allowed'), false);
  }
};

// Upload photo middleware
const uploadPhoto = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // Limit file size to 2MB
  fileFilter: photoFilter
}).single('jobPoster');

// Upload profile photo middleware
const uploadProfile = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // Limit file size to 2MB
  fileFilter: photoFilter
}).single('profileImage');

module.exports = { upload, uploadPhoto, uploadProfile };
