const Message = require('../models/message.model');
const MessageSession = require('../models/messageSession.model');

// Create a function that takes in IO from the server
exports.io = io => {
  // Once the IO server connects, then init sockets and use them
  io.on('connection', socket => {
    // Listen for newMessage event from the client and take in the message data
    socket.on('newMessage', data => {
      // Emit the event to the specific persons ID, recepients id, all clients are listening to their ID events
      io.emit(data.recepient, data);
    });
  });
};

const sendCookie = (cookieName, messageSessionId, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    secure: false,
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie(cookieName, messageSessionId, cookieOptions);
};

exports.getMessages = async (req, res, next) => {
  try {
    let messageSession;
    const { _id } = req.user;

    // If the user id is not parsed(loading msgs again on the page reload), take the message session
    // from the cookies

    if (req.params.userId.toString() !== 'nms') {
      const { userId } = req.params;

      messageSession = await MessageSession.find({
        $or: [
          { $and: [{ sender: _id }, { recepient: userId }] },
          { $and: [{ sender: userId }, { recepient: _id }] }
        ]
      });

      if (messageSession.length < 1) {
        return res.status(404).json({
          status: 'fail',
          message: 'No messages, type something to start chatting'
        });
      }
      // Extract our message session from the array
      messageSession = messageSession[0]._id;
    } else {
      messageSession = req.cookies.currentMessageSession;
    }

    const messages = await Message.find({
      messageSession
    }).populate('sender');

    if (messages.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No messages, type something to start chatting'
      });
    }

    sendCookie('currentMessageSession', messageSession, res);

    res.status(200).json({
      status: 'success',
      messages
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error
    });
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    let { recepient } = req.body;
    const { user } = req;

    // If there is no recepient, then pull him from cookie so we don't have to click
    // on the user we are chatting with every time we refresh the page to send messages
    if (!recepient) {
      recepient = req.cookies.recepient;
    }
    // Check if there is a message session for the 2 users
    // This query checks if there is message session where the sender is current user and
    // recepient is recepient, or if the sender is recepient and recepient is current user
    let messageSession = await MessageSession.find({
      $or: [
        { $and: [{ sender: user._id }, { recepient }] },
        { $and: [{ sender: recepient }, { recepient: user._id }] }
      ]
    });

    // Extract our message session from the array
    if (messageSession.length > 0) messageSession = messageSession[0];

    // Check to see if there messageSession was found
    if (messageSession.length < 1) {
      // if not create the message session
      messageSession = await MessageSession.create({
        sender: user._id,
        recepient
      });
    }

    const newMessage = await Message.create({
      messageSession: messageSession._id,
      message,
      sender: user._id,
      recepient
    });

    // Set the cookie for the recepient
    sendCookie('recepient', recepient, res);
    res.status(201).json({
      status: 'success',
      message: newMessage
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error
    });
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    const messageToDelete = await Message.findById(req.params.messageId);
    if (req.user._id.toString() !== messageToDelete.sender.toString()) {
      return res.status(400).json({
        status: 'error',
        message: 'You can delete only your messages'
      });
    }

    if (await Message.findByIdAndDelete(req.params.messageId)) {
      res.status(204).json({
        status: 'success',
        message: 'Message deleted successfully'
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error
    });
  }
};
