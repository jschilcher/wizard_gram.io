const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = mongoose.Schema(
  {
    username: { type: String, required: true, minlength: 5, maxlength: 50 },
    text: { type: String, required: true, minlength: 5, maxlength: 1000 },
    image: { type: String, required: true },
    like: { type: Number, required: true, default: 0 },
    dateAdded: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

function validatePost(post) {
  const Schema = Joi.object({
    username: Joi.string().min(5).max(50).required(),
    text: Joi.string().min(5).max(1000).required(),
    image: Joi.string().required(),
  });
  return Schema.validate(post);
}

module.exports = {
  Post: Post,
  validatePost: validatePost,
};
