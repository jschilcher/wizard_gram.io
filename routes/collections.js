const express = require('express');
const router = express.router();
const { User, validateUser } = require('../models/user');
const { Post, validatePost } = require('../models/post');
const { profile, validateProfile } = require('../models/profile');












module.exports = router;