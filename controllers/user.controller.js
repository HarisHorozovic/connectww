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

// '/geo-within/:distance/center/:latlng/unit/:unit'

exports.geoWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const { lat, lng } = latlng.split(',');

  if (!lat || !lng)
    return next(new AppError('Please enable your location', 400));
  // Radius is the distance we want to have as the radius but converted to radiants
  // In order to get radiants we need to divide the distance by the radius of the earth
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  // This query finds docs inside certain geometry
  const users = await User.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      data: users
    }
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const { lat, lng } = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng)
    return next(new AppError('Please enable your location', 400));

  // In order to do calculations we always use aggregation pipeline
  const distances = await User.aggregate([
    {
      // geoNear requires that at least one of our fields has geoSpatial index
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1]
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier
      },
      // project is used to define what data we want to keep in res, rest is ignored
      $project: {
        distance: 1,
        firstName: 1,
        lastName: 1
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances
    }
  });
});
