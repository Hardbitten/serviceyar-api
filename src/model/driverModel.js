const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mobileNumber: {
    type: Number,
  },
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
