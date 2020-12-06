const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.uploadFile = async (req) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
  });

  form.on("file", async (name, file) => {
    await cloudinary.uploader.upload(
      file.path,
      {
        resource_type: "auto",
        folder: "sample",
      },
      (err, result) => {}
    );
  });
  form.on("end", () => {
    return;
  });
};
