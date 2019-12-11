const express = require('express');

// Controllers
const commentController = require('../controllers/comment.controller');
const authController = require('../controllers/auth.controller');

// We have to use merge params here to get access to the params from the other router
const router = express.Router({ mergeParams: true });

// Allow routes only for logged in users, function saves user to the req.user
router.use(authController.protect);

// @method GET
// @route /api/v1/:id/comments
// @desc Get all comments for one post, :id is the post ID parsed through the post router

// @method POST
// @route /api/v1/:id/comments
// @desc Create new comment, :id is the post ID parsed through the post router
router
  .route('/')
  .get(commentController.getComments)
  .post(commentController.createComment);

// @method PATCH
// @route /api/v1/:id/comments/:commentId
// @desc Update Comment, :id is the post ID parsed through the post router

// @method Delete
// @route /api/v1/:id/comments/:commentId
// @desc Delete Comment, :id is the post ID parsed through the post router
router
  .route('/:commentId')
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
