"use strict";

/* eslint-disable no-undef */
module.exports.sendSocketMessage = function (req, message, receiver) {
  var io = req.app.get('socketio');
  io.sockets.in(receiver).emit('message received', message);
};