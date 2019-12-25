const express = require('express');

// Controllers
const authController = require('../controllers/auth.controller');
const galleryController = require('../controllers/gallery.controller');

const router = express.Router();

router.use(authController.protect);

// @method POST
// @route /api/v1/gallery/
// @desc Upload new image and save it to file system
router
  .route('/')
  .post(
    galleryController.checkUploadPath,
    galleryController.uploadPhoto,
    galleryController.resizeUploadedImage,
    galleryController.saveImageToDatabase
  );

// @method GET
// @route /api/v1/gallery/:userId
// @desc Get all images from one user
router.route('/:userId').get(galleryController.getUsersGallery);

module.exports = router;
