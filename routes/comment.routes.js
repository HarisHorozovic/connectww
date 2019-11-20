const express = require('express');

const router = express.Router();

// Controllers
const commentController = require('../controllers/comment.controller');

// @method POST
// @route /api/v1/comments/
// @desc Create new comment
router.route('/').post(commentController.createComment);

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
