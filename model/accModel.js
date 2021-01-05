const bcrypt = require("bcrypt");

const adminMongooseModel = require("./mongooseModel/adminModel");

exports.createDefaultAcc = async () => {
  //---------- Add user into database ---------
  const saltRounds = 10;
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
  }
  return;
};
