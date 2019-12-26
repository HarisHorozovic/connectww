const fs = require('fs');

const multer = require('multer');
const sharp = require('sharp');

const Gallery = require('../models/gallery.model');
const User = require('../models/user.model');

const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

exports.checkUploadPath = (req, res, next) => {
  // Create the path for every user we want to upload images
  const uploadPath = `${process.cwd()}/client/src/img/${req.user._id}`;
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

const multerStorage = multer.memoryStorage();

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

exports.resizeUploadedImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `image-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(1366, 768, {
      fit: 'inside'
    })
    .toFormat('jpeg')
    .jpeg({ quality: 85 })
    .toFile(
      `${process.cwd()}/client/src/img/${req.user._id}/${req.file.filename}`
    );

  next();
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
        image: req.file.filename
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
    image: req.file.filename
  });
});

exports.getUsersGallery = catchAsync(async (req, res, next) => {
  const gallery = await Gallery.findOne({ user: req.params.userId }).sort({
    createdAt: -1
  });

  if (!gallery)
    return next(
      new AppError('Error fetching the images, try again later', 500)
    );

  res.status(200).json({
    status: 'success',
    gallery
  });
});

exports.setMainImages = catchAsync(async (req, res, next) => {
  if (req.body.cover) {
    const user = await User.updateOne(
      { _id: req.user._id },
      { $set: { coverImage: req.body.cover } }
    );
    if (!user)
      return next(
        new AppError('Error setting the cover image, try again later', 400)
      );
    res.status(200).json({
      status: 'success'
    });
  } else if (req.body.profileImg) {
    const user = await User.updateOne(
      { _id: req.user._id },
      { $set: { profileImage: req.body.profileImg } }
    );
    if (!user)
      return next(
        new AppError('Error setting the profile image, try again later', 400)
      );
    res.status(200).json({
      status: 'success'
    });
  }
});
