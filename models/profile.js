const mongoose = require("mongoose");
const joi = require("joi");

const profileSchema = mongoose.Schema({
  image: { type: String, required: true },
  text: { type: String, required: true, minlength: 5, maxlength: 1000 },
  username: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const profile = mongoose.model("profile", profileSchema);

function validateProfile(profile) {
  const Schema = Joi.object({
    text: Joi.string().min(5).max(1000).required(),
    image: Joi.image().required(),
    username: Joi.string().min(5).max(50).required(),
  });
  return Schema.validate(profile);
}

module.exports = {
  profile: profile,
  validateProfile: validateProfile,
};
