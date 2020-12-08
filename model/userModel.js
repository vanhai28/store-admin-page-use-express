const userModel = require("../model/mongooseModel/userModel");
const userMongoose = require("../model/mongooseModel/userModel");

module.exports.getListUser = async () => {
  const listUser = await userMongoose.find({}, "user_name user_email status");
  return listUser;
};

module.exports.removeUserAcc = async (_id) => {
  try {
    await userMongoose.findByIdAndRemove({ _id: _id });
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};

module.exports.blockAccount = async (_id) => {
  try {
    await userMongoose.findByIdAndUpdate(_id, { status: "blocked" });
  } catch (error) {
    console.log("cannot update status ", error);
    return false;
  }

  return true;
};

module.exports.unBlockAccount = async (_id) => {
  try {
    await userMongoose.findOneAndUpdate({ _id: _id }, { status: "active" });
  } catch (error) {
    console.log("cannot update status ", error);
    return false;
  }

  return true;
};
