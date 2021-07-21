const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = mongoose.Schema({
    name: {type: String, required: true, minlength: 5, maxlength: 100},
    email: {type: String, required: true, minlength: 5, maxlength: 50},
    password: {type: String, required: true, minlength: 5, maxlength: 25}
})

const User = mongoose.model("user", userSchema);

function validateUser(user) {
    const Schema = Joi.object({
        name: Joi.string().min(5).max(100).required(),
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(25).required(),
    })
    return Schema.validate(user);
}

module.exports = {
    User: User,
    validateUser: validateUser
}