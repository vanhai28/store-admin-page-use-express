const bookModel = require("../model/mongooseModel/bookModel");

module.exports.getListBook = async () => {
  let bookList = await bookModel.find({}, "title price category"); //add auther
  return bookList;
};

module.exports.getNewProduct = () => {};
module.exports.getBestSellerBook = () => {};

module.exports.getRelatedBook = () => {};

module.exports.getUpsellProduct = () => {};

module.exports.getBookByCatory = (catory, number = -1) => {
  //number = -1 is get all
};
