const userService = require("../services/userService");

//Render page dashboard
module.exports.index = async function (req, res, next) {
  let listOfUser = await userService.getListUserByPage({}, 1, 5);

  res.render("index", {
    title: "Dashboard",
    data: listOfUser,
  });
};
