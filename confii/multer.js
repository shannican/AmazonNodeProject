const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     var fn = `${Date.now()}-${crypto.randomBytes(20).toString("hex")}${path.extname(file.originalname)}`;
//     console.log("FILE NAME");
//     console.log(fn);
//     cb(null, fn);
//   },
// });

// function fileFilter(req, file, cb) {
//   var fileType = file.mimetype;
//   fileType = fileType.split("/");
//   fileType = fileType[0];
//   if (fileType == "image") return cb(null, true);
//   else return cb(new Error("Given file is not Image"));
// }

// const upload = multer({ storage: storage, fileFilter: fileFilter });
// module.exports = upload;

const userImageUpload = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './public/images/uploads/userImageUpload')
  },
  filename: function (req, file, cb) {
    var fn = `${Date.now()}-${crypto.randomBytes(20).toString("hex")}${path.extname(file.originalname)}`;
      cb(null, fn)
  }
})
const productImageUpload = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './public/images/uploads/productImageUpload')
  },
  filename: function (req, file, cb) {
    var fn = `${Date.now()}-${crypto.randomBytes(20).toString("hex")}${path.extname(file.originalname)}`;
      cb(null, fn)
  }
})
module.exports = {userImageUpload, productImageUpload}
