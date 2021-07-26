const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { User, validateUser } = require("../models/user");
const { Post, validatePost } = require("../models/post");
const { profile, validateProfile } = require("../models/profile");
const { Friends, validateFriends } = require("../models/friends");

//get all the users data
router.get("/user", async (req, res) => {
  try {
    const user = await User.find();
    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//will get a specific user
router.get("/userId", async (req, res) => {
  try {
    const user = await User.find();
    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//grabs all the posts, not a specific users posts
router.get("/post", async (req, res) => {
  try {
    const post = await Post.find();
    return res.send(post);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//gets all the profiles, not a specific profile
router.get("/profile", async (req, res) => {
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

    const token = user.generateAuthToken();

    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({_id:user._id, name:user.name, email:user.email});

    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//creates a post(maybe tie this to a specific user)
router.post("/post", async (req, res) => {
  try {
    const { error } = validatePost(req.body);
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
});

router.post("/friends", async (req, res) => {
  try {
    const { error } = validateFriends(req.body);
    if (error) return res.status(400).send(error);

    const friends = new Friends({
      requester: req.body.requester,
      recepient: req.body.recepient,
    });

    await friends.save();

    return res.send(friends);
  } catch (ex) {
    return res.send(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/image", async (req, res) => {
  try {
    const { error } = validateImage(req.body);
    if (error) return res.status(400).send(error);

    const image = new image({
      image: req.body.image,
    });

    await image.save();

    return res.send(image);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//updates the likes on a specific post
router.put("/like/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    post.like = post.like + 1;
    await post.save();
    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

router.put("/friends/:friendId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.friendId);
    post.like = post.like + 1;
    await post.save();
    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

//Delete a user
router.delete("/:id", async (req, res) => {
  //Verify user ID
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only delete your own Account");
  }
});

//Follow Friend
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.friends.includes(req.body.userId)) {
        await user.updateOne({ $push: { friends: req.body.userId } });
        await currentUser.updateOne({ $push: { friends: req.body.userId } });
        res.status(200).json("You are now friends with this user!");
      } else {
        res.status(403).json("you are already friends with this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else res.status(403).json("You Can't friend yourself");
});

//unfollow user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.friends.includes(req.body.userId)) {
        await user.updateOne({ $pull: { friends: req.body.userId } });
        await currentUser.updateOne({ $pull: { friends: req.body.userId } });
        res.status(200).json("You are now not following this user!");
      } else {
        res.status(403).json("you don't follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else res.status(403).json("You can't unfollow yourself");
});

module.exports = router;
