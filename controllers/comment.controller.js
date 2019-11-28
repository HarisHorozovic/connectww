const Comment = require('../models/comment.model');

const factory = require('./handler.factory');

// Set Post and user IDs

exports.setPostUserIds = (req, res, next) => {
  // Allow Nested Routes
  if (!req.body.post) req.body.post = req.params.id;
  if (!req.body.author) req.body.author = req.user._id;

  next();
};

exports.createComment = factory.createOne(Comment);
exports.getComments = factory.getAll(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
