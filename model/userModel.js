const userModel = require("../model/mongooseModel/userModel");
const userMongoose = require("../model/mongooseModel/userModel");

module.exports.getListUser = async () => {
  const listUser = await userMongoose.find({}, "user_name user_email");
  console.log("--user ", listUser);
  return listUser;
};
