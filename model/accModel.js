const bcrypt = require("bcrypt");
const formidable = require("formidable");
const upload = require("../service/uploadFile");
const adminMongooseModel = require("./mongooseModel/adminModel");

const SALT_ROUNDS = 10;

exports.createDefaultAcc = async () => {
  //---------- Add user into database ---------
  const saltRounds = SALT_ROUNDS;
  const isExist = await adminMongooseModel.exists({ name: "admin" });
  if (isExist) {
    return;
  }

  await bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash("admin", salt, function (err, hash) {
      let acc = new adminMongooseModel({
        name: "admin",
        email: "admin@gmail.com",
        password: hash,
      });

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

exports.getAccountInfor = async () => {
  let accInfor = await adminMongooseModel.findOne({ name: "admin" });
  if (accInfor.password) {
    delete accInfor.password;
  }

  return accInfor;
};

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

module.exports.changeAvatar = async (req, next) => {
  const form = new formidable.IncomingForm({ multiples: true });
  let result = false;

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      result = false;
      next(false, null);
      return;
    }

    files = Array(files.file);

    upload.uploadFile(files, async (error, url) => {
      if (!url) {
        result = false;
        return false;
      }

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

      if (next) {
        next(result, url);
      }
    });
  });
};

module.exports.changePassword = async (req) => {
  if (!req.query.oldpass || !req.query.newpass) {
    return false;
  }

  let account = await adminMongooseModel.findOne({
    name: "admin",
  });
  let result = true;

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

  await bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.query.newpass, salt, async function (err, hash) {
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
