const express = require("express");
const router = express.Router();

router.use("/users", require("../users/routes.config"));
router.use("/auth", require("../auth/routes.config"));
router.use("/posts", require("../posts/routes.config"));
router.use("/newsfeed", require("../newsfeed/routes.config"));
router.use("/images", require("../images/routes.config"));

module.exports = router;
