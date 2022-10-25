const router = require("express").Router();
const postsModel = require("./models/blogs.model");
const BlogsController = require("./controllers/blogs.controller");

router.get("/", async (req, res) => {
  const result = await postsModel.findAll();
  return res.send(result);
});

router.post("/", [BlogsController.insert]);

router.get("/:postId", async (req, res) => {
  if (req.params.postId) {
    const result = await postsModel.findById(req.params.postId);
    return res.send(result);
  }
});

module.exports = router;
