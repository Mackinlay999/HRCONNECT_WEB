const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);

async function ConnectDb() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error while connecting to DB", error);
  }
}

module.exports = ConnectDb;
