const mongoose = require('mongoose');

// inside likes in the object put user: ObjectId('user');
const postSchema = new mongoose.Schema(
  {
    postImg: { type: String },
    text: { type: String, trim: true },
    createdAt: {
      type: Date,
      default: Date().toString()
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post must have an author']
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  // When we have a virtual property, field that is not stored in the DB
  // But calculated using some other value, we want this to show up whenever there is an output
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

postSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'author',
    select: 'firstName lastName userImg'
  }).populate({
    path: 'likes',
    select: 'firstName lastName userImg'
  });

  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
