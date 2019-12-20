const express = require('express');

// Controllers
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// @method POST
// @route /api/v1/users/signup
// @desc Create new user
router.post('/signup', authController.signup);
// @method POST
// @route /api/v1/users/login
// @desc log the user in, issue the JWT, save JWT to cookie
router.post('/login', authController.login);

// @method POST
// @route /api/v1/users/forgot-password
// @desc Send email with reset token for password
router.post('/forgot-password', authController.forgotPassword);
// @method PATCH
// @route /api/v1/users/reset-password/:token
// @desc Reset the password using the token sent using forgot-password route
router.patch('/reset-password/:token', authController.resetPassword);

// Allow routes only for logged in users, function saves user to the req.user
router.use(authController.protect);

// @method POST
// @route /api/v1/users/is-logged-in
// @desc Check if the user is currently logged in
router.get('/is-logged-in', authController.isLoggedIn);

// @method GET
// @route /api/v1/users/logout
// @desc log the user out and clear the cookie
router.get('/logout', authController.logout);

// @method PATCH
// @route /api/v1/users/update-password
// @desc Update password for the currently logged in user
router.patch('/update-password', authController.updatePassword);

// @method PATCH
// @route /api/v1/users/update-user-data
// @desc Update user info for the currently logged in user
router.patch('/update-user-data', userController.updateUser);

// @method GET
// @route /api/v1/users
// @desc Get all users friends

// @method DELETE
// @route /api/v1/users
// @desc Deactivate current users account
router
  .route('/')
  .get(userController.getUserFriends)
  .delete(userController.deleteUser);

// @method GET
// @route /api/v1/users/all
// @desc Get all users so we can search them on the frontend
router.route('/all').get(userController.getAllUsers);

// @method GET
// @route /api/v1/users/:id
// @desc Get single user

// @method POST
// @route /api/v1/users/:id
// @desc Send friend request to the user
router
  .route('/:id')
  .get(userController.getUser)
  .post(userController.addFriend);

// @method PATCH
// @route /api/v1/users/update-password
// @desc Update password for the currently logged in user

// @method PATCH
// @route /api/v1/users/update-password
// @desc Update password for the currently logged in user
router
  .route('/friend-requests')
  .post(userController.acceptFriendRequest)
  .delete(userController.declineFriendRequest);

// @method POST
// @route /api/v1/users/education
// @desc Add users education
router.route('/education/add').post(userController.addEducation);

// @method PATCH
// @route /api/v1/users/education/:id
// @desc Update selected users education

// @method DELETE
// @route /api/v1/users/education/:id
// @desc Delete selected education
router
  .route('/education/:educationId')
  .patch(userController.updateEducation)
  .delete(userController.removeEducation);

// @method POST
// @route /api/v1/users/experience
// @desc Add work experience for the user
router.route('/experience/add').post(userController.addExperience);

// @method PATCH
// @route /api/v1/users/experience/:id
// @desc Update selected users experience

// @method PATCH
// @route /api/v1/users/experience/:id
// @desc Delete Selected Experience
router
  .route('/experience/:experienceId')
  .patch(userController.updateExperience)
  .delete(userController.removeExperience);

module.exports = router;
