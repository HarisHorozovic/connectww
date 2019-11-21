const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().sort({ createdAt: -1 });

  if (posts.length === 0) {
    return next(new AppError('No posts to show', 404));
  }

  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts
    }
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const post = await Post.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      post
    }
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      post
    }
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!post) {
    return next(new AppError('No post found', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      post
    }
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

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
