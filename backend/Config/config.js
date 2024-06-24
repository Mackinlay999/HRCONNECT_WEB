const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const url = 'mongodb+srv://test:rNLut0abgUA0l6Dk@auth.s3olf6s.mongodb.net/?retryWrites=true&w=majority&appName=Auth'
mongoose.set('strictQuery', false);
async function ConnectDb() {
  try {
    await mongoose.connect(url);
    console.log("mongoDb connected");
  } catch (error) {
    console.log("Error while connecting to db", error);
  }
}

module.exports = ConnectDb;
