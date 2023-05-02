const express = require("express");
// specify the upload directory
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

const {
  createPost,
  getAllBlogs,
  fetchBlogPosts,
} = require("../controller/BlogController");

// set all blog routes
router.route("/post").post(upload.single("file"), createPost);
router.route("/post").get(getAllBlogs);
router.route("/blog/:blogId").get(fetchBlogPosts);

module.exports = router;
