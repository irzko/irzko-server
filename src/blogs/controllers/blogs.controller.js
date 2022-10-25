const BlogsModel = require("../models/blogs.model");
const multer = require("multer");
const { access, constants } = require("fs");

exports.insert = (req, res, next) => {
  const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
  const filename = uniqueSuffix + ".jpg";
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `upload/`);
    },
    filename: function (req, file, cb) {
      cb(null, filename);
    },
  });

  const upload = multer({ storage: storage }).single("file");

  let file = `./upload/${filename}`;

  upload(req, res, (err) => {
    if (!err) {
      access(file, constants.F_OK, (err) => {
        const { body } = req;
        if (err) {
          console.error(err);
          body.thumbnail = "";
        } else {
          body.thumbnail = filename;
        }
        BlogsModel.createBlog(body).then((result) => {
          res.status(201).send("Created post successfully!");
        });
      });
    }
  });
};
