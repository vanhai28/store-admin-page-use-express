const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminAccount = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: String,
  dateOfBirth: Date,
});

module.exports = mongoose.model("adminAccount", adminAccount);
