const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema(
  {
    user_name: String,
    user_email: String,
    password: String,
  },
  { collection: "users" }
);

module.exports = mongoose.model("users", user);
