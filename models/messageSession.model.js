const mongoose = require('mongoose');

const messageSessionSchema = mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recepient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const MessageSession = mongoose.model('MessageSession', messageSessionSchema);

module.exports = MessageSession;
