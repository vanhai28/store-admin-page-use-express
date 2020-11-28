const mongoose = require("mongoose");
const { Schema } = mongoose;

const book = new Schema(
  {
    title: String,
    category: String,
    auther: Array,
    detail: String,
    price: String,
    images: Array,
    cover: String,
  },
  { collection: "books" }
);

module.exports = mongoose.model("books", book);
