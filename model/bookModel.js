const bookModel = require("../model/mongooseModel/bookModel");

module.exports.getListBook = async () => {
  let bookList = await bookModel.find({}, "title price category"); //add auther
  return bookList;
};

module.exports.addBook = async (bookInfor) => {
  let images = [bookInfor.linkImage1, bookInfor.linkImage2];
  let auther = bookInfor.auther ? bookInfor.auther.split(",") : "";
  let newBook = new bookModel({
    title: bookInfor.title,
    auther: auther,
    category: bookInfor.category,
    price: bookInfor.price,
    images: images,
    cover: bookInfor.coverImage,
  });
  let result = false;
  newBook
    .save()
    .then((doc) => {
      console.log("them thanh cong", doc);
      result = true;
    })
    .then((err) => {
      if (err) {
        console.log(err);
        result = false;
      }
    });

  return result;
};

module.exports.deleteBook = async (id) => {
  let result = await bookModel.findByIdAndDelete({ _id: id });
  console.log("result : ", result);
};

module.exports.getBookByCatory = (catory, number = -1) => {
  //number = -1 is get all
};
