const express = require('express');

// Controllers
const authController = require('../controllers/auth.controller');
const galleryController = require('../controllers/gallery.controller');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .post(
    galleryController.checkUploadPath,
    galleryController.uploadPhoto,
    galleryController.saveImageToDatabase
  );

router.route('/:userId').get(galleryController.getUsersGallery);

module.exports = router;
