const PostsModel = require("../models/post.model");
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
          body.image = "";
        } else {
          body.image = filename;
        }
        PostsModel.createPost(body).then((result) => {
          res.status(201).send("Created post successfully!");
        });
      });
    }
  });

  // await
};

exports.getAll = (req, res, next) => {
  PostsModel.findAll().then((result) => {
    res.send(result);
  });
};

exports.getById = async (req, res, next) => {
  const result = await PostsModel.findById(req.params.IdPost);
  res.send(result);
};

exports.like = (req, res, next) => {
  const { body } = req;
  PostsModel.like(body._id, body.profile_id);
  res.status(200).send("OK");
};

exports.unlike = (req, res, next) => {
  const { body } = req;
  PostsModel.unlike(body._id, body.profile_id);
  res.status(200).send("OK");
};

exports.deletePost = (req, res, next) => {
  PostsModel.delete(req.body._id);
  res.status(200).send("OK");
};

exports.comment = (req, res, next) => {
  const { body } = req;
  PostsModel.comment(body._id, body.profile_id, body.comment);
  res.status(200).send("OK");
};