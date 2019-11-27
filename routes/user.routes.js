const express = require('express');

const router = express.Router();

// Controllers
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

router.patch(
  '/update-password',
  authController.protect,
  authController.updatePassword
);

router.patch(
  '/update-user-data',
  authController.protect,
  userController.updateUser
);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser)
  .delete(authController.protect, userController.deleteUser);

router.route('/:id').get(userController.getUser);

module.exports = router;
