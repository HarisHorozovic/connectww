const crypto = require('crypto');

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  firstName: { type: String, required: [true, 'You must enter first name'] },
  lastName: { type: String, required: [true, 'You must enter last name'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'You must confirm your password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords do not match'
    }
  },
  passwordChangedAt: Date,
  DOB: { type: Date },
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
  ],
  passwordResetToken: String,
  passwordResetExpires: Date
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

// Compare the encrypted passwords is the same as the entered password
// Creating instance method(method available on all documents of certain collection)
// This points to the current document
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  // Generate random token with built in crypto
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Encrypt the token, create new field to store in the db
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
