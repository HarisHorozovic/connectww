const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

// Factory functions
const factory = require('./handler.factory');

exports.createPost = factory.createOne(Post);
exports.getAllPosts = factory.getAll(Post);
exports.getPost = factory.getOne(Post, { path: 'comments' });
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);

exports.getCommentsForPost = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.id }).sort({
    createdAt: -1
  });

  if (comments.length === 0) {
    return next(new AppError('No comments for this post', 404));
  }

  res.status(200).json({
    status: 'success',
    results: comments.length,
    data: {
      comments
    }
  });
});
