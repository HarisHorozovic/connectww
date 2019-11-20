const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
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

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
