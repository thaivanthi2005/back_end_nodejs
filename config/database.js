const mongoose = require("mongoose");

module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("CONNECT SUCCESS");
  } catch {
    console.log("CONNECT ERROR");
  }
};
