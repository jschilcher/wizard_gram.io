const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");
const { Post, validatePost } = require("../models/post");
const { profile, validateProfile } = require("../models/profile");

//get all the users data
router.get('/user', async (req, res) => {
  try {
      const user = await User.find();
      return res.send(user);
  } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//will get a specific user
router.get('/userId', async (req, res) => {
  try {
      const user = await User.find();
      return res.send(user);
  } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//grabs all the posts, not a specific users posts
router.get('/post', async (req, res) => {
  try {
      const post = await Post.find();
      return res.send(post);
  } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//gets all the profiles, not a specific profile
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
    const salt = await bcrypt.genSalt(10);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
    });

    await user.save();

    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//creates a post(maybe tie this to a specific user)
router.post("/post", async (req, res) => {
  try {
    const {error} = validatePost(req.body);
    if (error) return res.status(400).send(error);

    const post = new Post({
      username: req.body.username,
      text: req.body.text,
      image: req.body.image,
    });

    await post.save();

    return res.send(post);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
})


router.post("/image", async (req, res) => {
  try {
    const {error} = validateImage(req.body);
    if (error) return res.status(400).send(error);

    const image = new image({
      image: req.body.image,
    });

    await image.save();

    return res.send(image);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`)
  }
})



//updates the likes on a specific post
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
