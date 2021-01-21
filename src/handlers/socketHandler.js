/* eslint-disable no-undef */
module.exports.sendSocketMessage = (req, message, receiver) => {
   const io = req.app.get('socketio');
   io.sockets.in(receiver).emit('message received', message);
};
