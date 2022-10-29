const UserModel = require("../models/users.model");
const crypto = require("crypto");
const multer = require("multer");
const { access, constants } = require("fs");

exports.insert = (req, res, next) => {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;
  UserModel.createUser(req.body).then((result) => {
    res.status(201).send({ id: result._id });
  });
};

exports.getById = (req, res) => {
  UserModel.findById(req.params.userId).then((result) => {
    delete result.password;
    res.status(200).send(result);
  });
};

exports.changeAvt = (req, res, next) => {
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
          body.avatar = "";
        } else {
          body.avatar = filename;
        }
        UserModel.changeAvt(body).then((result) => {
          res.status(201).send("Change avatar successfully!");
        });
      });
    }
  });
};

exports.changeName = async (req, res) => {
  UserModel.changeName(req.body._id, req.body.firstName, req.body.lastName);
  res.status(201).send("Change name successfully!");
};

exports.changeEmail = async (req, res) => {
  UserModel.changeEmail(req.body._id, req.body.email);
  res.status(201).send("Change email successfully!");
};

exports.getAllUser = async (req, res) => {
  const users = await UserModel.getAll();
  return res.status(201).send(users);
};
