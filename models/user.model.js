const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstName: { type: String, required: [true, 'You must enter first name'] },
  lastName: { type: String, required: [true, 'You must enter last name'] },
  email: { type: String, required: [true, 'Email is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  DOB: { type: Date, required: [true, 'You must enter your date of birth'] },
  createdAt: { type: Date, default: Date().toString() },
  gender: { type: String, required: [true, 'You must select your gender'] },
  relationship: { type: String },
  location: { type: String },
  bio: { type: String },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  experience: [
    {
      company: { type: String },
      position: { type: String },
      from: { type: Date },
      to: { type: Date },
      current: { type: Boolean },
      desc: { type: String }
    }
  ],
  education: [
    {
      school: { type: String },
      degree: { type: String },
      studied: { type: String },
      from: { type: Date },
      to: { type: Date },
      current: { type: Boolean },
      desc: { type: String }
    }
  ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
