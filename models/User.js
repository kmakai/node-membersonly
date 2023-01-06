const e = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isMember: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});

UserSchema.virtual("url").get(function () {
  return `/users/${this._id}`;
});

UserSchema.virtual("username").get(function () {
  return this.email;
});

module.exports = mongoose.model("User", UserSchema);
