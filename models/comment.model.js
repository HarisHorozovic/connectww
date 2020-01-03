const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'You must create comment for specific post']
  },
  text: {
    type: String,
    required: [true, 'You must type something to leave a comment'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date().toString()
  }
});

commentSchema.index({ author: 1, post: 1 }, { unique: true });

commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'author',
    select: 'firstName lastName profileImage'
  });

  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
