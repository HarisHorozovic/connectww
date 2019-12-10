const express = require('express');

// Controllers
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

router.use(authController.protect);

router.patch(
  '/update-password',
  authController.protect,
  authController.updatePassword
);

router.patch('/update-user-data', userController.updateUser);

router
  .route('/')
  .get(userController.getUserFriends)
  .delete(userController.deleteUser);

router
  .route('/friends')
  .get()
  .delete();

router
  .route('/friend-requests')
  .post(userController.acceptFriendRequest)
  .delete(userController.declineFriendRequest);

router.route('/education').post(userController.addEducation);

router
  .route('/education/:id')
  .patch(userController.updateEducation)
  .delete(userController.removeEducation);

router.route('/experience').post(userController.addExperience);

router
  .route('/experience/:id')
  .patch(userController.updateExperience)
  .delete(userController.removeExperience);

router
  .route('/:id')
  .get(userController.getUser)
  .post(userController.addFriend);

module.exports = router;
