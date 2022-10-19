const router = require("express").Router();
const postsModel = require("./models/posts.model");


router.get("/", (req, res, next) => {
  return postsModel.findAll().then((result) => {
    // console.log(req.cookies)
    res.send(result);
  });
});

module.exports = router;
