const mongoose = require("mongoose");
const Joi = require("joi");
const { User } = require("../models/user");
const user = require("../models/user");

var Schema = mongoose.Schema
const friendsSchema = new Schema({
  requester: { type: Schema.ObjectId, ref: "user" },
  recepient: { type: Schema.ObjectId, ref: "user" },
  status: {
    type: Number,
    enums: [0, "add friends", 1, "requested", 2, "pending", 3, "friends"],
  },
});

const Friends = mongoose.model("friends", friendsSchema);

// TO DO: does friends need validation
function validateFriends(friends) {
    const Schema = Joi.object({
        requester: { type: Schema.Type.ObjectId, ref: 'user' },
        recepient: { type: Schema.Type.ObjectId, ref: 'user'},

    })
}

module.exports = {
  Friends: Friends,
  validateFriends: validateFriends
};
