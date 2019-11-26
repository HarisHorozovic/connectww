const { promisify } = require('util');

const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');
const sendEmail = require('../utils/email');

const signToken = id => {
  // Sign the token for the user, in the sign we first put the payload/ user info
  // that we want in the token, second argument is the token secret
  // third param is object with token options, this is where we put when the token expires
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

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

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
      token
    }
  });
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
    return next(new AppError('Invalid email or password', 401));

  // if everything is ok send token to the client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    data: {
      token
    }
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // Get the token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
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
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/reset-password/${resetToken}`;

  const message = `Forgot your password? Submit your new password 
  to: ${resetURL}\n If you didn't forget your password, 
  ignore this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'ConnectWW password reset, valid for 10 minutes',
      message
    });

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

exports.resetPassword = (req, res, next) => {};
