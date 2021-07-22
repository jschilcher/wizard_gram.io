const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const {User} = require("../models/user");
const router = express.Router();

function validateLogin(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(25).required(),
    });
    return schema.validate(req);
}

module.exports = router;