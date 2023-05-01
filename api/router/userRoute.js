const express = require("express");
const router = express.Router();

// import all user controllers
const { register, login } = require("../controller/UserController");

// set all routes of user
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
