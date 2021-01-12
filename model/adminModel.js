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
  fullname: String,
  phone: String,
  dateOfBirth: Date,
  address: String,
  avatar_image: String,
});

module.exports = mongoose.model("adminAccount", adminAccount);
