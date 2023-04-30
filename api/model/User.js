const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
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

module.exports = model("user", UserSchema);
