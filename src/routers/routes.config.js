const express = require("express");
const router = express.Router();

router.use("/users", require("../users/routes.config"));
router.use("/auth", require("../auth/routes.config"));
router.use("/posts", require("../post/routes.config"));

module.exports = router;
