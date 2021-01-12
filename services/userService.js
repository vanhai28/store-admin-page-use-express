const userModel = require("../model/userModel");
const userMongoose = require("../model/userModel");

module.exports.getListUserByPage = async (filter, pageIndex, numberItem) => {
  const options = {
    page: pageIndex,
    limit: numberItem,
    select: [
      "_id",
      "user_name",
      "user_email",
      "status",
      "avatar_image",
      "Lastest_Time_Access",
    ],
    collection: "users",
  };

  let listUser = null;

  await userModel.paginate(filter, options, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      listUser = result;
    }
  }); //add auther

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
