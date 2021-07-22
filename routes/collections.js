const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");
const { Post, validatePost } = require("../models/post");
const { profile, validateProfile } = require("../models/profile");

//Add your Get Request Here

//POST Request Start Below
router.post("/user", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error);
    //TODO: Validation!
    const user = new User({
      firstName: req.body.text,
      lastName: req.body,
      username: req.body,
      email: req.body,
      password: req.body,
    });

    await user.save();

    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// router.post("/posts", async (req, res) => {
//   try {
//     const { error } = validatePost(req.body);
//     if (error) return res.status(400).send(error);
//     //TODO: Validation!
//     const post = new Post({
//       text: req.body.text,
//       image: req.body,
//       like: req.body,
//     });

//     await post.save();

//     return res.send(post);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

module.exports = router;
