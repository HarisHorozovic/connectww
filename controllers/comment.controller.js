const Comment = require('../models/comment.model');

const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

// Create comment for specific post
exports.createComment = catchAsync(async (req, res, next) => {
  const commentBody = {
    post: req.params.id,
    author: req.user._id,
    text: req.body.text
  };

  const comment = await Comment.create(commentBody);

  if (!comment) return next(new AppError('Error commenting on this post', 400));

  res.status(201).json({
    status: 'success',
    message: 'Comment created succesfully',
    comment
  });
});

// Get all comments for single post
exports.getComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.id }).sort({
    createdAt: -1
  });

  if (!comments) return next(new AppError('No comments for this post', 404));

  res.status(200).json({
    status: 'success',
    comments
  });
});

// Update Comment
exports.updateComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);

  // Send error if someone else except comment author tries to update comment
  if (comment.author._id.toString() !== req.user._id.toString())
    return next(
      new AppError('You are not the comment author, access denied', 400)
    );

  comment.text = req.body.text;

  if (await comment.save()) {
    return res.status(200).json({
      status: 'success',
      message: 'Comment updated successfully',
      comment
    });
  }

  next(new AppError('Error updating comment', 400));
});

// Delete comment
exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);

  // Send error if someone else except comment author tries to update comment
  if (comment.author._id.toString() !== req.user._id.toString())
    return next(
      new AppError('You are not the comment author, access denied', 400)
    );

  if (await comment.remove()) {
    return res.status(200).json({
      status: 'success',
      message: 'Comment removed successfully'
    });
  }

  next(new AppError('Error removing comment', 400));
});
