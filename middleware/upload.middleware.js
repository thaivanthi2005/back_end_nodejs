// const cloudinary = require("cloudinary").v2;
// const streamifier = require("streamifier");

// cloudinary.config({
//   cloud_name: process.env.cloud_name,
//   api_key: process.env.api_key,
//   api_secret: process.env.api_secret,
// });

// // module.exports.upload_images = (req, res, next) => {
// //   if (req.file) {
// //     let streamUpload = (req) => {
// //       return new Promise((resolve, reject) => {
// //         let stream = cloudinary.uploader.upload_stream((error, result) => {
// //           if (result) {
// //             resolve(result);
// //           } else {
// //             reject(error);
// //           }
// //         });

// //         streamifier.createReadStream(req.file.buffer).pipe(stream);
// //       });
// //     };

// //     async function upload(req) {
// //       let result = await streamUpload(req);
// //       req.body[req.file.fieldname] = result.url;
// //       next();
// //     }
// //     upload(req);
// //   } else {
// //     next();
// //   }
// // };

// //END CLOUDUNARY

// let streamUpload = (buffer) => {
//   return new Promise((resolve, reject) => {
//     let stream = cloudinary.uploader.upload_stream((error, result) => {
//       if (result) {
//         resolve(result);
//       } else {
//         reject(error);
//       }
//     });
//     streamifier.createReadStream(buffer).pipe(stream);
//   });
// };

// const uploadToCloudinary = async (buffer) => {
//   let result = await streamUpload(buffer);
//   return result.url;
// };
const uploadToCloudinary = require("../helper/uploadToCloudinary");
module.exports.upload_images = async (req, res, next) => {
  if (req.file) {
    const link = await uploadToCloudinary(req.file.buffer);
    req.body[req.file.fieldname] = link;
  }
  next();
};
