const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");
const { Post, validatePost } = require("../models/post");
const { profile, validateProfile } = require("../models/profile");

router.get('/user', async (req, res) => {
  try {
      const user = await User.find();
      return res.send(user);
  } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get('/post', async (req, res) => {
  try {
      const post = await Post.find();
      return res.send(post);
  } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get('/profile', async (req, res) => {
  try {
      const profile = await Profile.find();
      return res.send(profile);
  } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

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

router.put('/like/:postId', async (req,res) => {
  try{
      const post = await Post.findById(req.params.postId)
      post.like = post.like + 1
      await post.save()
      return res.status(200).send(post)

  } catch(err){
      return res.status(500).send(`Internal Server Error: ${err}`);
  }

})

module.exports = router;
