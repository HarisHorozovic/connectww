const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  images: [
    {
      imgName: { type: String },
      createdAt: { type: Date, default: Date().toString() }
    }
  ]
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
