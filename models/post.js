const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = mongoose.Schema({
    text: {type: String, required: true, minlength: 5, maxlength: 1000},
    image: {type: Image, required: true},
    like: {type: Number, required: true, default: 0},
    dateAdded: {type: Date, default: Date.now},
})

const Post = mongoose.model("post", postSchema);

function validatePost(post) {
    const Schema = Joi.object({
        text: Joi.string().min(5).max(1000).required(),
        image: Joi.image().required(),
    })
    return Schema.validate(post);
}

module.exports = {
    Post: Post,
    validatePost: validatePost
}