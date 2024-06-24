const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.memoryStorage(), // Use memory storage to get file buffer
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (
      ext !== ".mp4" &&
      ext !== ".mkv" &&
      ext !== ".jpeg" &&
      ext !== ".jpg" &&
      ext !== ".png" &&
      ext !== ".webm"
    ) {
      cb(new Error("file type is not supported"), false);
    } else {
      cb(null, true);
    }
  },
});
