const express = require("express");
const router = express.Router();

router.use("/users", require("../users/routes.config"));
router.use("/auth", require("../auth/routes.config"));
router.use("/blogs", require("../blogs/routes.config"));
router.use("/newsfeed", require("../newsfeed/routes.config"));
router.use("/image", require("../images/routes.config"));
router.use("/upload", require("../upload/routes"));

module.exports = router;
