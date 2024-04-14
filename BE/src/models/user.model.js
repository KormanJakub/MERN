const crypto = require("crypto");
const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    nickName: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, lowercase: true, trim: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.checkPassword = function (password) {
  const hash_pwd = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.password === hash_pwd;
};

module.exports = mongoose.model("User", userSchema);
