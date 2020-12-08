const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.uploadFile = async (arrayfiles, callback) => {
  if (!arrayfiles || !arrayfiles[0] || arrayfiles[0].name == "") {
    callback(null, null);
    return;
  }

  let count = 0;
  let urls = [];
  try {
    await arrayfiles.forEach(async (file) => {
      await cloudinary.uploader.upload(
        file.path,
        {
          resource_type: "auto",
          folder: "sample",
        },
        (err, result) => {
          if (err) {
            callback(err, {});
          } else {
            count++;
            urls.push(result.url);
          }
        }
      );

      if (count == arrayfiles.length) {
        callback(null, urls);
      }
    });
  } catch (error) {
    callback(error, null);
  }
};
// module.exports.uploadFile = async (files, callback) => {

//   let imageArray = files.upload;
//   let count = 0;
//   let image = {
//     images: [],
//     cover: "",
//   };
//   await imageArray.forEach(async (file) => {
//     await cloudinary.uploader.upload(
//       file.path,
//       {
//         resource_type: "auto",
//         folder: "sample",
//       },
//       (err, result) => {
//         if (err) {
//           callback(err, {});
//         } else {
//           count++;
//           image.images.push(result.url);
//         }
//       }
//     );

//     if (count == imageArray.length) {
//       await cloudinary.uploader.upload(
//         files.coverImage.path,
//         {
//           resource_type: "auto",
//           folder: "sample",
//         },
//         (err, result) => {
//           if (err) {
//             callback("error when upload cover image", {});
//           } else {
//             image.cover = result.url;
//             callback(null, image);
//           }
//         }
//       );
//     }
//   });
// };
