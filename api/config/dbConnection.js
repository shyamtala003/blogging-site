require("dotenv").config();
const mongoose = require("mongoose");

async function connectToDB() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connectToDB;
