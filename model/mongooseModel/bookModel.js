const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const book = new Schema(
  {
    title: String,
    category: String,
    author: Array,
    detail: String,
    price: String,
    old_price: String,
    images: Array,
    cover: String,
    best_seller: Boolean,
    views: Number,
    orders: Number,
    isDelete: Boolean,
  },
  { collection: "books" }
);
book.plugin(mongoosePaginate);
module.exports = mongoose.model("books", book);
