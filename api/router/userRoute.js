const express = require("express");
const router = express.Router();
// specify the upload directory
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// import all user controllers
const {
  register,
  login,
  profile,
  logout,
} = require("../controller/UserController");

// set all routes of user
router.route("/register").post(upload.single("file"), register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").get(profile);

module.exports = router;
