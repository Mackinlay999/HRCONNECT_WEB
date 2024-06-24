const mongoose = require("mongoose");

const userSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
}); 

const UserSession = mongoose.model("UserSession", userSessionSchema);

module.exports = UserSession;
