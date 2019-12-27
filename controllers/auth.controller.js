const fs = require('fs');

const { promisify } = require('util');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');
const Email = require('../utils/email');

const signToken = id => {
  // Sign the token for the user, in the sign we first put the payload/ user info
  // that we want in the token, second argument is the token secret
  // third param is object with token options, this is where we put when the token expires
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: false,
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  // Put the cookie on the response object
  res.cookie('jwt', token, cookieOptions);

  //Remove password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  const { user } = req;

  if (!user) return next(new AppError('Log in to continue', 401));

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    DOB: req.body.DOB,
    gender: req.body.gender,
    relationship: req.body.relationship,
    location: req.body.location,
    bio: req.body.bio
  });

  // CREATE FOLDER FOR UPLOADING IMAGES WHEN REGISTERING NEW USER
  const uploadPath = `${process.cwd()}/client/src/img/${newUser._id}`;
  // Check if the folder that we want to save users imgs exist
  if (fs.existsSync(uploadPath)) {
    return next();
  }
  // If it does not exist create the folder for user
  fs.mkdir(uploadPath, err => {
    if (err) return next(new AppError('Error creating folder', 500));
  });

  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please enter your email and password', 400));
  }

  // check if the user exist && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Invalid email or password', 400));

  // if everything is ok send token to the client
  createAndSendToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie('jwt', 'logged-out', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
});

exports.protect = catchAsync(async (req, res, next) => {
  // Get the token and check if it exists
  let token;
  // Get token from req.headers instead of the cookie if needed
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith('Bearer')
  // ) {
  //   token = req.headers.authorization.split(' ')[1];
  // }
  // If there is a jwt cookie and if it is not the cookie we set on the logout, set the token to the one from the cookie
  if (req.cookies.jwt && req.cookies.jwt !== 'logged-out') {
    token = req.cookies.jwt;
  }
  if (!token) return next(new AppError('Log in to continue', 401));

  // Verification of the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exists
  const freshUser = await User.findById(decoded.id);

  if (!freshUser)
    return next(new AppError('User belonging to token does not exist', 401));

  // Check if user changed password after the token was issued
  if (freshUser.changedPasswordAfter(token.iat))
    return next(
      new AppError('User recently changed password, please log in again', 401)
    );

  // Put user in the request
  req.user = freshUser;

  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Get user based on posted email
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError('No user with that email address', 404));
  // Generate the random reset token
  // Create instance method in the user model for this resource
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // Send it to users email
  // Create the reset url for the user

  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/reset-password/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email'
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending the email', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });
  // Set new password if token has not expired and there is user
  if (!user) {
    return next(new AppError('Invalid token, or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // Update changedPasswordAt property for the user
  // Log the user in, send JWT
  createAndSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // Get user from collection
  const user = await User.findById(req.user._id).select('password');
  // Check if password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password)))
    return next(new AppError('Your current password is incorrect', 400));
  // If so update the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // Log in the user, send JWT logged in with the new password
  createAndSendToken(user, 200, res);
});
