const express = require('express');

const router = express.Router();

// Controllers
const postController = require('../controllers/post.controller');

// Param Middleware
router.param('id', postController.checkID);

router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.checkPostBody, postController.createPost);

router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
