const router = require("express").Router();
const UploadController = require("./controllers/upload");

router.post("/image", [UploadController.insert]);

module.exports = router;
