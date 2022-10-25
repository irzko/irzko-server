const express = require("express");
const router = express.Router();

const NewsFeedController = require("./controllers/newsfeed.controller");

router.post("/", [NewsFeedController.insert]);
router.get("/", [NewsFeedController.getAll]);
router.get("/:IdPost", [NewsFeedController.getById]);

router.post("/like", [NewsFeedController.like]);
router.post("/unlike", [NewsFeedController.unlike]);
router.post("/delete", [NewsFeedController.deletePost]);
module.exports = router;
