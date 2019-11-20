const express = require('express');

const router = express.Router();

// Controllers
const postController = require('../controllers/post.controller');

// @method GET
// @route /api/v1/posts/
// @desc Get all posts, TODO: Redo the func later that it only gets users friends posts

// @method POST
// @route /api/v1/posts/
// @desc Create new post
router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost);

// @method GET
// @route /api/v1/posts/:id
// @desc Get all the comments for the post

// @method PATCH
// @route /api/v1/posts/:id
// @desc Update post

// @method DELETE
// @route /api/v1/posts/:id
// @desc Delete post
router
  .route('/:id')
  .get(postController.getCommentsForPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
