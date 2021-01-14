const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const book = new Schema(
  {
    title: String,
    category: String,
    author: Array,
    detail: String,
    price: Number,
    old_price: Number,
    images: Array,
    cover: String,
    best_seller: Boolean,
    views: Number,
    orders: Number,
    isDelete: Boolean,
    idCategory: String,
  },
  { collection: "books" }
);
book.index({ title: "text" });
book.plugin(mongoosePaginate);
module.exports = mongoose.model("books", book);
