const router = require("express").Router();
const postsModel = require("../blogs/models/blogs.model");

router.get("/:keyword", async (req, res) => {
  if (req.params.keyword) {
    console.log(req.params.keyword);
    const result = await postsModel.search(req.params.keyword);
    return res.send(result);
  }
});

module.exports = router;
