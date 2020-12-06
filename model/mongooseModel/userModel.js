const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const user = new Schema(
  {
    user_name: String,
    user_email: String,
    password: String,
    status: String,
    birthday: Date,
    lastest_access_date: Date,
  },
  { collection: "users" }
);

user.plugin(mongoosePaginate);

module.exports = mongoose.model("users", user);
