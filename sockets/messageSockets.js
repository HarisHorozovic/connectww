module.exports = io => {
  // Once the IO server connects, then init sockets and use them
  io.on('connection', socket => {
    // Listen for newMessage event from the client and take in the message data
    socket.on('newMessage', data => {
      // Emit the event to the specific persons ID, recepients id, all clients are listening to their ID events
      io.emit(data.recepient, data);
    });
  });
};
