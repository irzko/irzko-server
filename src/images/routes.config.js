const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/:image", (req, res) => {
  res.sendFile(
    path.join(__dirname, `../../uploads/newsfeed/${req.params.image}`)
  );
  //   res.sendFile(`uploads/newsfeed/${req.params.image}`);
});

module.exports = router;
