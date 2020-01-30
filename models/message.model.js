const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  messageSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MessageSession'
  },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recepient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, trim: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date() }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
