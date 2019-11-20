const mongoose = require('mongoose');

// inside likes in the object put user: ObjectId('user');
const PostSchema = new mongoose.Schema({
  postImg: { type: String },
  text: { type: String, trim: true },
  createdAt: {
    type: Date,
    default: Date().toString()
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
