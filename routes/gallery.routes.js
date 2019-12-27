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
    galleryController.uploadPhoto,
    galleryController.resizeUploadedImage,
    galleryController.saveImageToDatabase
  );

// @method GET
// @route /api/v1/gallery/:userId
// @desc Get all images from one user
router.route('/:userId').get(galleryController.getUsersGallery);

// @method DELETE
// @route /api/v1/gallery/:imageName
// @desc Remove image from gallery and from file system
router.route('/image/:imageName').delete(galleryController.removeImage);

// @method PATCH
// @route /api/v1/gallery/set-main
// @desc Set cover and profile images
router.route('/set-main').patch(galleryController.setMainImages);

module.exports = router;
