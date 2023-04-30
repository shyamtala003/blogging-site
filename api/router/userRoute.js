const express = require("express");
const router = express.Router();

// import all user controllers
const { register } = require("../controller/UserController");

// set all routes of user
router.route("/register").post(register);

module.exports = router;
