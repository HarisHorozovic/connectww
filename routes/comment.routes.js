const express = require('express');

// Controllers
const commentController = require('../controllers/comment.controller');
const authController = require('../controllers/auth.controller');

// We have to use merge params here to get access to the params from the other router
const router = express.Router({ mergeParams: true });

// @method POST
// @route /api/v1/:postId/comments
// @desc Create new comment
router
  .route('/')
  .get(authController.protect, commentController.getComments)
  .post(
    authController.protect,
    commentController.setPostUserIds,
    commentController.createComment
  );

// @method PATCH
// @route /api/v1/comments/:id
// @desc Update Comment

// @method Delete
// @route /api/v1/comments/:id
// @desc Delete Comment
router
  .route('/:id')
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
