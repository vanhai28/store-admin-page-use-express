const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const user = new Schema(
  {
    user_name: String,
    user_email: String,
    first_name: String,
    last_name: String,
    phone_number: String,
    password: String,
    status: String,
    avatar_image: String,
    isVerify: Boolean,
    verify_token: String,
    lastest_access_date: String,
  },
  { collection: "users" }
);

user.plugin(mongoosePaginate);

module.exports = mongoose.model("users", user);
