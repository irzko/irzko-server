const multer = require("multer");

exports.insert = async (req, res, next) => {
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

  upload(req, res, (err) => {
    if (err) throw err;
    res.send(filename);
  });
};
