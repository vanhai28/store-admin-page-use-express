const bcrypt = require("bcrypt");
const adminMongooseModel = require("../model/adminModel");

exports.authLoginAcc = async (email, pass) => {
  //----------------- find in database ---------------

  let account = await adminMongooseModel.findOne({
    email: email,
  });

  if (account) {
    let checkPassword = await bcrypt.compare(pass, account.password);
    if (checkPassword) {
      return account; //right password
    }
  }

  return null;
};
