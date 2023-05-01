require("dotenv").config();
const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// encrypt the password using bcryptjs and mongoose pre hook(middleware)
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// validate password using mongoose methods and bcryptjs
UserSchema.methods.isValidatedPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generate jsonwebtoken using jsonwebtoken and mongoose methods
UserSchema.methods.generateJwtToken = function () {
  const jwtPayload = {
    id: this._id,
    userName: this.userName,
    email: this.email,
  };

  const jwtOptions = {
    expiresIn: process.env.JWT_EXPIRY,
  };

  return jwt.sign(jwtPayload, process.env.JWT_SECRET, jwtOptions);
};

module.exports = model("user", UserSchema);
