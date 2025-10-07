const express = require('express')
const postController = require('./Post.controller')
const router = express.Router()
router.get('./posts', postController.getAllPosts)
router.post('./post', )

module.exports = postController