const bookModel = require("../model/mongooseModel/bookModel");
const catalogModel = require("../model/categoryModel");
const catalog = require("../model/mongooseModel/catalogModel");

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
  //find category, return null if not found
  let category = await catalog.findOne({ nameOfCategory: bookInfor.category });
  // add new category into catalog

  if (!category) {
    await catalogModel.addCategory(bookInfor.category);
  } else {
    try {
      await catalog.findByIdAndUpdate(category._id, {
        numberOfProduct: category.numberOfProduct + 1,
      });
    } catch (error) {
      console.log("error when update number of product: ", error);
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
  await newBook
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
  let book = await bookModel.findById(id);
  let category = await catalog.findOne({ nameOfCategory: book.category });

  if (category.numberOfProduct - 1 == 0) {
    await catalog.findByIdAndDelete(category._id);
  } else {
    await catalog.findByIdAndUpdate(category._id, {
      numberOfProduct: category.numberOfProduct - 1,
    });
  }

  await bookModel.findByIdAndDelete(id);
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
  let oldBook = await bookModel.findById(id);
  let oldCategory = await catalog.findOne({ nameOfCategory: oldBook.category });

  if (oldCategory.nameOfCategory != book.category) {
    // update numberOfProduct of old category
    if (oldCategory.numberOfProduct - 1 == 0) {
      //empty
      await catalog.findByIdAndRemove(oldCategory._id);
    } else {
      await catalog.findByIdAndUpdate(oldCategory._id, {
        numberOfProduct: oldCategory.numberOfProduct - 1,
      });
    }

    //find category, return null if not found
    let category = await catalog.findOne({ nameOfCategory: book.category });
    // add new category into catalog
    if (!category) {
      await catalogModel.addCategory(book.category);
    } else {
      try {
        await catalog.findByIdAndUpdate(category._id, {
          numberOfProduct: category.numberOfProduct + 1,
        });
      } catch (error) {
        console.log("error when update number of product: ", error);
      }
    }
  }
  try {
    if (book._id) delete book._id;
    book.images = book.images.split(",");
    await bookModel.findByIdAndUpdate(id, book);
  } catch (error) {
    console.log("error ", error);
  }
};
