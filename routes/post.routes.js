const express = require('express');

const router = express.Router();

const commentRouter = require('./comment.routes');

// Controllers
const postController = require('../controllers/post.controller');
const authController = require('../controllers/auth.controller');

// Allow routes only for logged in users, function saves user to the req.user
router.use(authController.protect);
// Use comments router if the route ends in /comments, this is so we can parse params to the comment router from post router
router.use('/:id/comments', commentRouter);

// @method GET
// @route /api/v1/posts/
// @desc Get all posts from the current users friends

// @method POST
// @route /api/v1/posts/
// @desc Create new post
router
  .route('/')
  .get(postController.getAllFriendsPosts)
  .post(postController.createPost);

// @method GET
// @route /api/v1/posts/me
// @desc Get all current users posts
router.route('/me').get(postController.getUsersPosts);

// @method GET
// @route /api/v1/posts/:id
// @desc Get single post

// @method PATCH
// @route /api/v1/posts/:id
// @desc Update post

// @method DELETE
// @route /api/v1/posts/:id
// @desc Delete post
router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

// @method POST
// @route /api/v1/posts/:id/like
// @desc Like/ remove like from selected post

// @method POST
// @route /api/v1/posts/:id/dislike
// @desc Dislike/ remove dislike from selected post
router.route('/:id/like').post(postController.likePost);
router.route('/:id/dislike').post(postController.dislikePost);

module.exports = router;
