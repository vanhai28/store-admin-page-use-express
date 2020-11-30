const bookModel = require("../model/mongooseModel/bookModel");

module.exports.getListBook = async () => {
  let bookList = await bookModel.find(
    {},
    "title price category author views orders"
  ); //add auther

  return bookList;
};

module.exports.addBook = async (bookInfor) => {
  let images = bookInfor.images.split(",");
  // remove element is invalid
  for (let i = 0; i < images.length; i++) {
    if (images[i].replace(/ /g, "") == "") {
      images[i] = images[images.length - 1];
      images.pop();
      i--;
    }
  }
  let author = bookInfor.author ? bookInfor.author.split(",") : "";
  // remove element is invalid
  for (let i = 0; i < author.length; i++) {
    if (author[i].replace(/ /g, "") == "") {
      author[i] = author[author.length - 1];
      author.pop();
      i--;
    }
  }

  let newBook = new bookModel({
    title: bookInfor.title,
    author: author.length > 0 ? author : [],
    category: bookInfor.category,
    price: bookInfor.price,
    images: images.length > 0 ? images : [],
    cover: bookInfor.coverImage,
    views: 0,
    orders: 0,
  });
  let result = false;
  newBook
    .save()
    .then((doc) => {
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
module.exports.getOneBook = async (id) => {
  let book;

  try {
    book = await bookModel.findOne({ _id: id });
  } catch (error) {
    console.log(err);
    return null;
  }

  return book;
};

module.exports.modifyBook = async (id, book) => {
  try {
    if (book._id) delete book._id;
    book.images = book.images.split(",");
    await bookModel.findByIdAndUpdate(id, book);
  } catch (error) {
    console.log("error ", error);
  }
};
