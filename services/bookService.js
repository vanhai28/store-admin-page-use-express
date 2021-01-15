const bookModel = require("../model/bookModel");
const catalogModel = require("./categoryService");
const catalog = require("../model/catalogModel");

/**
 * get books by page
 * @param {object} filter condition to filt
 * @param {number} pageIndex page to get books
 * @param {number} numberItem number books got per page
 * @returns {object}
 */
module.exports.getBooksByPage = async (filter, pageIndex, numberItem) => {
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

/**
 * add a book to database
 * @param {object} bookInfor information of a book
 * @returns {boolean}
 */
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
/**
 * set isDelete of a book is true
 * @param {any} id id of book which will be deleted
 */
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
/**
 * get infomation of a book
 * @param {any} _id id of book
 * @return {object} object
 */
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
/**
 * save changed information of a book
 * @param {object} book book with new information
 * @return {boolean}
 */
module.exports.modifyBook = async (book) => {
  let oldBook = await bookModel.findById(book._id);
  let oldCategory = await catalog.findOne({ nameOfCategory: oldBook.category });

  if (oldCategory.nameOfCategory != book.category) {
    // update numberOfProduct of old category

    await catalog.findByIdAndUpdate(oldCategory._id, {
      numberOfProduct: oldCategory.numberOfProduct - 1,
    });

    //find category, return null if not found
    let category = await catalog.findOne({ nameOfCategory: book.category });
    if (!category) {
      await catalogModel.addCategory(book.category);
    } else {
      try {
        book.idCategory = category._id; //update new id of category
        // increase number of book of category
        await catalog.findByIdAndUpdate(category._id, {
          numberOfProduct: category.numberOfProduct + 1,
        });
      } catch (error) {
        console.log("error when update number of product: ", error);
      }
    }
  }

  try {
    if (!book.images) delete book.images; //if admin don't update image
    if (!book.cover) delete book.cover; // if admin don't update cover image

    await bookModel.findByIdAndUpdate(book._id, book); //update book
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};
/**
 * search a book with string
 * @param {string} value name of book want to search
 * @return {object}
 */
module.exports.searchBook = async (value) => {
  const options = {
    page: 1,
    limit: 2,
  };

  let filter;

  if (value) {
    filter = { $text: { $search: value } };
  } else {
    filter = {};
  }
  let bookList;

  await bookModel.paginate(filter, options, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      bookList = result;
    }
  }); //add auther
  bookList.totalPages = 1;
  bookList.hasNextPage = false;
  bookList.nextPage = undefined;
  bookList.totalPage = 1;
  bookList.page = 1;
  return bookList;
};
