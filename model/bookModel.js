const bookModel = require("../model/mongooseModel/bookModel");
const catalogModel = require("../model/categoryModel");
const catalog = require("../model/mongooseModel/catalogModel");

module.exports.getBookByPage = async (filter, pageIndex, numberItem) => {
  const options = {
    page: pageIndex,
    limit: numberItem,
  };

  let bookList;

  await bookModel.paginate(filter, options, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      bookList = result;
    }
  }); //add auther

  return bookList;
};

module.exports.addBook = async (bookInfor) => {
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
    images: bookInfor.images,
    detail: bookInfor.detail,
    cover: bookInfor.cover,
    views: 0,
    orders: 0,
    isDelete: false,
    idCategory: category._id,
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

  if (category.numberOfProduct - 1 >= 0) {
    await catalog.findByIdAndUpdate(category._id, {
      numberOfProduct: category.numberOfProduct - 1,
    });
  }

  await bookModel.findByIdAndUpdate(id, { isDelete: true });
};

module.exports.getOneBook = async (_id) => {
  let book;
  try {
    book = await bookModel.findOne({ _id: _id });
  } catch (error) {
    console.log(error);
    return null;
  }

  return book;
};

module.exports.modifyBook = async (book) => {
  let oldBook = await bookModel.findById(book._id);
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
    if (!book.images) delete book.images;
    if (!book.cover) delete book.cover;

    await bookModel.findByIdAndUpdate(book._id, book);
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};

module.exports.searchBook = async (value) => {
  const options = {
    page: 1,
    limit: 10,
  };

  let bookList = [];

  await bookModel.paginate({ title: value }, options, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      bookList = result;
    }
  }); //add auther

  return bookList;
};
