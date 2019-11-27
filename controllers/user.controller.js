const User = require('../models/user.model');

const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUsers = (req, res) => {
  res.status(500).json({ status: 'error', message: 'Route not implemented' });
};

exports.createUser = (req, res, next) => {
  res.status(500).json({ status: 'error', message: 'Route not implemented' });
};
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('Could not find the user', 400));

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  // Create error if user posts password data
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'Can not update password here, use password update route',
        400
      )
    );

  // Update user document
  const filteredBody = filterObj(
    req.body,
    'firstName',
    'lastName',
    'DOB',
    'gender',
    'relationship',
    'location',
    'bio'
  );
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});
