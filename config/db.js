// Using Node.js `require()`
const mongoose = require("mongoose");

const URI = process.env.URI;
//define a connection
exports.mongoose = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("mongoose is connected...");
  } catch (err) {
    console.error(err);
  }
};
// const MongoClient = require("mongodb").MongoClient;
// const assert = require("assert");

// Connection URL
// const url = process.env.URI;
// let db;
// Database Name
// const dbName = "book-store-database";
// exports.MongoClient = () => {
//   Use connect method to connect to the server
//   MongoClient.connect(url, function (err, client) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");

//     db = client.db(dbName);
//     client.close();
//   });
// };
// exports.db = db;
