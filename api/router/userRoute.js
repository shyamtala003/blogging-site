const express = require("express");
const router = express.Router();

// import all user controllers
const {
  register,
  login,
  profile,
  logout,
} = require("../controller/UserController");

// set all routes of user
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").get(profile);

module.exports = router;
