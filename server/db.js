const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

(async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to the database !!");
  } catch (err) {
    console.log("Could not connect to the database", err);
  }
})();

module.exports = mongoose;
