const catalog = require("../model/catalogModel");

module.exports.addCategory = async (name) => {
  let newCategory = new catalog({
    nameOfCategory: name,
    numberOfProduct: 1,
  });

  await newCategory
    .save()
    .then((doc) => {})
    .then((err) => {
      if (err) console.log("error when add new category ", err);
    });
};

module.exports.getAllCategory = async () => {
  let result = await catalog.find({});
  return result;
};
