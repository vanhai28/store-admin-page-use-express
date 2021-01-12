const bcrypt = require("bcrypt");
const formidable = require("formidable");

const upload = require("./uploadFile");
const adminMongooseModel = require("../model/adminModel");

const SALT_ROUNDS = 10; // used for generator hash password
//---------- Add user into database ---------
exports.createDefaultAcc = async () => {
  const saltRounds = SALT_ROUNDS;
  const isExist = await adminMongooseModel.exists({ name: "admin" });

  if (isExist) {
    // return if 'admin' is already in database
    return;
  }

  // generator hash password
  await bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash("admin", salt, function (err, hash) {
      let acc = new adminMongooseModel({
        name: "admin",
        email: "admin@gmail.com",
        password: hash,
      });
      // save to database
      acc
        .save()
        .then((doc) => {})
        .then((err) => {
          console.log(err);
        });
    });
  });

  return;
};

// Get account information of admin not including password
exports.getAccountInfor = async () => {
  let accInfor = await adminMongooseModel.findOne({ name: "admin" });

  if (accInfor.password) {
    delete accInfor.password;
  }

  return accInfor;
};

// Save changed information of admin , escape password
exports.saveAccountInfor = async (field, value) => {
  switch (field) {
    case "fullname":
      await adminMongooseModel.findOneAndUpdate(
        { name: "admin" },
        { fullname: value }
      );
      break;
    case "phone":
      await adminMongooseModel.findOneAndUpdate(
        { name: "admin" },
        { phone: value }
      );
      break;
    case "email":
      await adminMongooseModel.findOneAndUpdate(
        { name: "admin" },
        { email: value }
      );
      break;
    case "address": {
      await adminMongooseModel.findOneAndUpdate(
        { name: "admin" },
        { address: value }
      );
      break;
    }
    default: {
      return false;
    }
  }
  return true;
};

// function save avatar image to cloudinary and save URL to Database
// Required callback next() because 'await' is not working
module.exports.changeAvatar = async (req, next) => {
  const form = new formidable.IncomingForm({ multiples: true });
  let result = false;

  // get files and orther fields in request
  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      result = false;
      next(false, null);
      return;
    }
    // Convert to Array for parameter uploadFile function
    files = Array(files.file);

    //upload file to cloudinary
    upload.uploadFile(files, async (error, url) => {
      if (!url) {
        result = false;
        return false;
      }
      //convert to HTTPS
      url[0].replace("http://", "https://");

      // Save to database
      try {
        await adminMongooseModel.findOneAndUpdate(
          { name: "admin" },
          { avatar_image: url[0] },
          (err, docs) => {
            if (err) result = false;
            else {
              result = true;
            }
          }
        );
      } catch (error) {
        result = false;
      }
      // call callback to response result
      if (next) {
        next(result, url);
      }
    });
  });
};

// Change password of admin
module.exports.changePassword = async (req) => {
  // check valid params in request
  if (!req.query.oldpass || !req.query.newpass) {
    return false;
  }
  // get account of admin
  let account = await adminMongooseModel.findOne({
    name: "admin",
  });
  let result = true; //flag to save result of change password processing

  // Check old password
  if (account) {
    let checkPassword = await bcrypt.compare(
      req.query.oldpass,
      account.password
    );

    if (!checkPassword) {
      return false; //right password
    }
  }

  const saltRounds = SALT_ROUNDS;
  // gender salt, hash password
  await bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.query.newpass, salt, async function (err, hash) {
      // save to database
      await adminMongooseModel.findOneAndUpdate(
        { name: "admin" },
        { password: hash },
        (err, docs) => {
          if (err) {
            result = false;
          }
        }
      );
    });
  });

  return result;
};
