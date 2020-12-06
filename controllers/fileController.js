const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const upload = require("../service/uploadFile");
module.exports.uploadImage = async (req, res, next) => {
  await upload.uploadFile(req);
  res.send("success");
};
