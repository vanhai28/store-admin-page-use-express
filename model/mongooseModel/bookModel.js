const mongoose = require("mongoose");
const { Schema } = mongoose;

const book = new Schema(
  {
    title: String,
    category: String,
    detail: String,
    price: String,
  },
  { collection: "books" }
);

module.exports = mongoose.model("books", book);
