const fs = require('fs');

const multer = require('multer');

const Gallery = require('../models/gallery.model');

const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

exports.checkUploadPath = (req, res, next) => {
  // Create the path for every user we want to upload images
  const uploadPath = `${process.cwd()}/public/img/${req.user._id}`;
  // Check if the folder that we want to save users imgs exist
  if (fs.existsSync(uploadPath)) {
    return next();
  }
  // If it does not exist create the folder for user
  fs.mkdir(uploadPath, err => {
    if (err) return next(new AppError('Error creating folder', 500));
  });

  next();
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/img/${req.user._id}`);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `image-${req.user._id}-${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Uploaded file is not an image', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadPhoto = upload.single('uploadedImg');

exports.saveImageToDatabase = catchAsync(async (req, res, next) => {
  const gallery = await Gallery.findOne({ user: req.user._id });

  // If user already has gallery just upload the image
  if (gallery) {
    // Update the gallery and push the new image name inside the array
    if (
      await gallery.updateOne({
        $push: { images: { imgName: req.file.filename } }
      })
    ) {
      // Take gallery and push the image inside images array se we return latest info to the client
      gallery.images.push({ imgName: req.file.filename });
      return res.status(201).json({
        status: 'success',
        gallery
      });
    }

    return next(new AppError('Error uploading image, try again', 400));
  }

  // If user does not have gallery create it and upload the image
  const newGallery = await Gallery.create({
    user: req.user._id,
    images: { imgName: req.file.filename }
  });

  if (!newGallery)
    return next(new AppError('Something went wrong uploading the image', 400));

  res.status(201).json({
    status: 'success',
    gallery: newGallery
  });
});

exports.getUsersGallery = catchAsync(async (req, res, next) => {
  const gallery = await Gallery.findOne({ user: req.params.userId });

  if (!gallery)
    return next(
      new AppError('Error fetching the images, try again later', 500)
    );

  res.status(200).json({
    status: 'success',
    gallery
  });
});
