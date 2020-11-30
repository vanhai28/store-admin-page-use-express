const mongoose = require("mongoose");
const { Schema } = mongoose;

const catalog = new Schema(
  {
    nameOfCategory: String,
    numberOfProduct: Number,
  },
  {
    collection: "catalog",
  }
);

module.exports = mongoose.model("catalog", catalog);
