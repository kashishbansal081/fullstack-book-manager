const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB = process.env.MONGOURL;

async function dbConnect() {
  await mongoose
    .connect(MONGODB)
    .then(() => {
      console.log("MONGO DB connected successfully.");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { dbConnect };
