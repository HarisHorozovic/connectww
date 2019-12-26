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

// Get friends from currently logged in user
exports.getUserFriends = catchAsync(async (req, res, next) => {
  const { friends } = req.user;

  if (!friends) return next(new AppError('No friends yet, add some', 404));

  res.status(200).json({
    status: 'success',
    data: {
      friends
    }
  });
});

// Get friend requests from currently logged in user
exports.getFriendRequests = catchAsync(async (req, res, next) => {
  const { friendRequests } = req.user;

  if (!friendRequests) return next(new AppError('No new requests', 404));

  res.status(200).json({
    status: 'success',
    data: {
      friendRequests
    }
  });
});

// Add a friend
exports.addFriend = catchAsync(async (req, res, next) => {
  const newFriend = await User.findById(req.params.id);
  const { friendRequests, friends } = newFriend;

  if (!newFriend) return next(new AppError('Could not find the user', 404));

  const usersInReq = [];
  const usersInFriends = [];

  // Map through requests and friends and return the users, then after that check if those new arrays contain req.user._id
  // Convert all IDs to string to enable includes comparison
  friendRequests.map(request => usersInReq.push(request._id.toString()));
  friends.map(friend => usersInFriends.push(friend._id.toString()));

  if (
    usersInReq.includes(req.user._id.toString()) ||
    usersInFriends.includes(req.user._id.toString())
  ) {
    return next(
      new AppError(
        'Can not send request to this user, you are either their friend or already sent them a request',
        400
      )
    );
  }

  if (
    await newFriend.updateOne({
      $push: {
        friendRequests: req.user._id
      }
    })
  ) {
    return res.status(200).json({
      status: 'success',
      message: 'Friend Request Sent',
      newFriend
    });
  }

  return res.status(400).json({
    status: 'fail',
    message: 'Error occured while sending friend request'
  });
});

// Accept friend request
exports.acceptFriendRequest = catchAsync(async (req, res, next) => {
  // Get both of the users that will be friends
  const friend = await User.findById(req.params.friendId);
  const { friendRequests } = req.user;

  // Find index of the friend request
  const index = friendRequests.findIndex(
    request => request._id.toString() === req.params.friendId.toString()
  );

  // If there is a index then remove the user from the friend requests and put him in friends
  // Also put the current users id in the friends list of the user that requested friendship
  if (index !== -1) {
    req.user.friends.unshift(friendRequests[index]);
    friendRequests.splice(index, 1);

    const user = await req.user.save({ validateBeforeSave: false });
    if (
      user &&
      (await friend.updateOne({
        $push: {
          friends: req.user._id
        }
      }))
    ) {
      return res.status(200).json({
        status: 'success',
        data: {
          user
        }
      });
    }
  }

  // Return generic error if something failed
  res.status(400).json({
    status: 'fail',
    message: 'Could not accept a friend request'
  });
});

// Decline Friend Request
exports.declineFriendRequest = catchAsync(async (req, res, next) => {
  const { friendRequests } = req.user;

  // Find index of the friend request
  const index = friendRequests.findIndex(
    request => request._id.toString() === req.params.friendId.toString()
  );

  // If there is friend request in database remove it
  if (index !== -1) {
    friendRequests.splice(index, 1);

    const user = await req.user.save({ validateBeforeSave: false });
    if (user) {
      return res.status(200).json({
        status: 'success',
        message: 'Request succesfully removed',
        data: {
          user
        }
      });
    }
  }

  res.status(400).json({
    status: 'fail',
    message: 'Error removing request, try again later'
  });
});

exports.removeFriend = catchAsync(async (req, res, next) => {
  const { friends } = req.user;
  const deletingUser = await User.findById(req.params.friendId);

  // Find index of the friend request
  const index = friends.findIndex(
    friend => friend._id.toString() === req.params.friendId.toString()
  );

  const deletingIndex = deletingUser.friends.findIndex(
    friend => friend._id.toString() === req.user._id.toString()
  );

  // If there is friend request in database remove it
  if (index !== -1) {
    friends.splice(index, 1);
  } else {
    return next(new AppError('Something went wrong, try again later', 400));
  }
  if (deletingIndex !== -1) {
    deletingUser.friends.splice(deletingIndex, 1);
  } else {
    return next(new AppError('Something went wrong, try again later', 400));
  }

  const user = await req.user.save({ validateBeforeSave: false });
  const removedFriend = await deletingUser.save({
    validateBeforeSave: false
  });
  if (user) {
    return res.status(200).json({
      status: 'success',
      message: 'Friend succesfully removed',
      data: {
        user,
        removedFriend
      }
    });
  }

  res.status(400).json({
    status: 'fail',
    message: 'Error removing friend, try again later'
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  if (!users) return next(new AppError('No users to show', 404));

  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  });
});

// Get user
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

// Update currently logged in users info
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

// Deactivate currently logged in uses account
exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Add experience
exports.addExperience = catchAsync(async (req, res, next) => {
  const newExp = {
    company: req.body.company,
    position: req.body.position,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    desc: req.body.desc
  };
  await req.user.updateOne({
    $push: { experience: newExp }
  });

  res.status(200).json({
    status: 'success',
    experience: newExp
  });
});
// Edit experience
exports.updateExperience = catchAsync(async (req, res, next) => {
  await User.findOneAndUpdate(
    { _id: req.user._id, 'experience._id': req.params.experienceId },
    {
      $set: {
        'experience.$.company': req.body.company,
        'experience.$.position': req.body.position,
        'experience.$.from': req.body.from,
        'experience.$.to': req.body.to,
        'experience.$.current': req.body.current,
        'experience.$.desc': req.body.desc
      }
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Experience updated'
  });
});
// Remove experience
exports.removeExperience = catchAsync(async (req, res, next) => {
  const { experience } = req.user;

  const index = experience.findIndex(
    el => el._id.toString() === req.params.experienceId.toString()
  );

  // If there is experience in database remove it
  if (index !== -1) {
    experience.splice(index, 1);

    if (await req.user.save({ validateBeforeSave: false })) {
      res.status(200).json({
        status: 'success',
        message: 'Experience succesfully removed'
      });
    }
  }
});

// Add education
exports.addEducation = catchAsync(async (req, res, next) => {
  const newEdu = {
    school: req.body.school,
    degree: req.body.degree,
    studied: req.body.studied,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    desc: req.body.desc
  };
  await req.user.updateOne({
    $push: { education: newEdu }
  });
  res.status(200).json({
    status: 'success',
    education: newEdu
  });
});
// Edit Education
exports.updateEducation = catchAsync(async (req, res, next) => {
  await User.findOneAndUpdate(
    { _id: req.user._id, 'education._id': req.params.educationId },
    {
      $set: {
        'education.$.school': req.body.school,
        'education.$.degree': req.body.degree,
        'education.$.studied': req.body.studied,
        'education.$.from': req.body.from,
        'education.$.to': req.body.to,
        'education.$.current': req.body.current,
        'education.$.desc': req.body.desc
      }
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Education updated'
  });
});
// Remove Education

exports.removeEducation = catchAsync(async (req, res, next) => {
  const { education } = req.user;

  const index = education.findIndex(
    el => el._id.toString() === req.params.educationId.toString()
  );

  // If there is education in database remove it
  if (index !== -1) {
    education.splice(index, 1);

    if (await req.user.save({ validateBeforeSave: false })) {
      res.status(200).json({
        status: 'success',
        message: 'Education succesfully removed'
      });
    }
  }
});
