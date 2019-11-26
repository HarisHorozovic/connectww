const User = require('../models/user.model');

const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

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

exports.updateUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'Route not implemented' });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'Route not implemented' });
};
