const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
// const { Friends } = require("../models/friends");

//hello golden

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true, minlength: 5, maxlength: 100 },
  lastName: { type: String, required: true, minlength: 5, maxlength: 100 },
  username: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1000 },
  friends: { type: Array, default: [] },
});

const User = mongoose.model("user", userSchema);

function validateUser(user) {
  const Schema = Joi.object({
    firstName: Joi.string().min(5).max(100).required(),
    lastName: Joi.string().min(5).max(100).required(),
    username: Joi.string().min(5).max(100).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(1000).required(),
  });
  return Schema.validate(user);
}

module.exports = {
  User: User,
  validateUser: validateUser,
};
