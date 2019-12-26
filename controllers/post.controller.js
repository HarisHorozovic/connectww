const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

// Factory functions
const factory = require('./handler.factory');

const isCurrentUser = (testUser, currentUser) =>
  testUser.toString() === currentUser.toString();

// Create new post, if there is file, upload file, can refactor for images to have description later
exports.createPost = catchAsync(async (req, res, next) => {
  let newPost = {};

  if (!req.file) {
    newPost = {
      text: req.body.text,
      author: req.user._id
    };
  } else {
    newPost = {
      postImg: req.file.filename,
      author: req.user._id
    };
  }

  const post = await Post.create(newPost);

  console.log(post);

  if (!post)
    return next(new AppError('Error creating the post, try again later', 400));

  res.status(201).json({
    status: 'success',
    post
  });
});

// Get all posts to be shown on the homepage of the ConnectWW
exports.getAllFriendsPosts = catchAsync(async (req, res, next) => {
  const { friends } = req.user;

  const userFriends = [];

  friends.map(friend => userFriends.push(friend.user));

  const posts = await Post.find({ author: { $in: userFriends } }).sort({
    createdAt: -1
  });

  if (!posts) return next(new AppError('No posts to show', 404));

  res.status(200).json({
    status: 'success',
    posts
  });
});

// Get all posts from current user
exports.getUsersPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ author: req.params.userId }).sort({
    createdAt: -1
  });
  if (!posts) return next(new AppError('No posts to show', 404));

  res.status(200).json({
    status: 'success',
    posts
  });
});

// Get single post, not used, use if needed
exports.getPost = factory.getOne(Post, { path: 'comments' });

// Update Post Data
exports.updatePost = catchAsync(async (req, res, next) => {
  // Choose what to acccept from the req.body
  const updateBody = {
    text: req.body.text,
    postImg: req.body.postImg
  };
  const post = await Post.findById(req.params.id);

  // Check to see if the user that is trying to update post is the one that has created the post
  if (!isCurrentUser(post.author._id, req.user._id))
    return next(new AppError('Can not update other users posts', 400));

  const newPost = await Post.findByIdAndUpdate(post._id, updateBody, {
    new: true,
    validateBeforeSave: true
  });

  if (!newPost) return next(new AppError('Error updating the post', 400));

  res.status(200).json({
    status: 'success',
    message: 'Post succesfully updated',
    psot: newPost
  });
});

// Delete Post
exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  // Check to see if the user that is trying to update post is the one that has created the post
  if (!isCurrentUser(post.author._id, req.user._id))
    return next(new AppError('Can not delete other users posts', 400));

  if (await Post.findByIdAndDelete(req.params.id)) {
    res.status(204).json({
      status: 'success',
      message: 'Post succesfully deleted'
    });
  }

  res.status(400).json({
    status: 'fail',
    message: 'Error deleting the post, try again later'
  });
});

// Like Post
exports.likePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  const usersInLikes = [];

  // Convert all ids to strings so we can use them in the .includes check
  post.likes.map(like => usersInLikes.push(like._id.toString()));

  // If user has liked the post already, remove his like
  if (usersInLikes.includes(req.user._id.toString())) {
    const index = usersInLikes.indexOf(req.user._id.toString());
    post.likes.splice(index, 1);
    if (await post.save({ validateBeforeSave: false })) {
      return res.status(200).json({
        status: 'success',
        message: 'Like removed succesfully',
        post
      });
    }

    return next(new AppError('Something went wrong', 400));
  }

  post.likes.push(req.user._id);

  if (await post.save({ validateBeforeSave: false })) {
    return res.status(200).json({
      status: 'success',
      message: 'Post liked succesfully',
      post
    });
  }

  res.status(400).json({
    status: 'fail',
    message: 'Something is wrong, try again later'
  });
});

// Dislike Post
exports.dislikePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  const usersInDislikes = [];

  // Convert all ids to strings so we can use them in the .includes check
  post.dislikes.map(dislike => usersInDislikes.push(dislike._id.toString()));

  // If user has disliked the post already, remove the dislike
  if (usersInDislikes.includes(req.user._id.toString())) {
    const index = usersInDislikes.indexOf(req.user._id.toString());
    post.dislikes.splice(index, 1);
    if (await post.save({ validateBeforeSave: false })) {
      return res.status(200).json({
        status: 'success',
        message: 'Dislike removed succesfully',
        post
      });
    }

    return next(new AppError('Something went wrong', 400));
  }

  post.dislikes.push(req.user._id);

  if (await post.save({ validateBeforeSave: false })) {
    return res.status(200).json({
      status: 'success',
      message: 'Post disliked succesfully',
      post
    });
  }

  res.status(400).json({
    status: 'fail',
    message: 'Something is wrong, try again later'
  });
});

// Remove and move it to the comments controller
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
