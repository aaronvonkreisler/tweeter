"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessagesForChatRoom = exports.sendMessage = exports.sendMessageWithFile = void 0;

require("regenerator-runtime/runtime");

var _sharp = _interopRequireDefault(require("sharp"));

var _messages = require("./messages.model");

var _chat = require("../chat/chat.model");

var _imageUpload = require("../../../services/imageUpload");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// eslint-disable-next-line no-undef
var socketHandler = require('../../../handlers/socketHandler');

var sendMessageWithFile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, content, chatId, files, sender, message, resizedBuffer, image, populatedMessage, chat;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, content = _req$body.content, chatId = _req$body.chatId;
            files = req.files;
            sender = req.user.id;
            message = undefined;

            if (files) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              msg: 'This route requires a file'
            }));

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return (0, _sharp.default)(files.image.data).resize(300, null).webp().toBuffer();

          case 9:
            resizedBuffer = _context.sent;
            _context.next = 12;
            return (0, _imageUpload.uploadBufferPhoto)(resizedBuffer);

          case 12:
            image = _context.sent;
            message = new _messages.Message({
              sender: sender,
              chat: chatId,
              content: content,
              image: image.Location
            });
            _context.next = 16;
            return message.save();

          case 16:
            _context.next = 18;
            return message.populate({
              path: 'sender',
              select: 'name avatar'
            }).execPopulate();

          case 18:
            populatedMessage = _context.sent;
            _context.next = 21;
            return _chat.Chat.findById(chatId);

          case 21:
            chat = _context.sent;
            chat.users.forEach(function (user) {
              var userId = user.toString();

              if (userId === sender) {
                return;
              }

              socketHandler.sendSocketMessage(req, populatedMessage, userId);
            });
            res.json(populatedMessage);
            _context.next = 31;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](6);
            console.error(_context.t0.message);

            if (_context.t0.message === 'Input buffer contains unsupported image format') {
              res.status(400).json({
                msg: 'Unsupported image format'
              });
            }

            res.status(500).send('Server Error');

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 26]]);
  }));

  return function sendMessageWithFile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendMessageWithFile = sendMessageWithFile;

var sendMessage = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, chatId, content, image, sender, message, populatedMessage, chat;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, chatId = _req$body2.chatId, content = _req$body2.content, image = _req$body2.image;
            sender = req.user.id;

            if (!chatId) {
              console.log('No Chat ID in request');
              res.status(400).json({
                msg: 'Chat ID must be present in request'
              });
            }

            _context2.prev = 3;
            _context2.next = 6;
            return _messages.Message.create({
              sender: sender,
              content: content,
              image: image,
              chat: chatId
            });

          case 6:
            message = _context2.sent;
            _context2.next = 9;
            return message.populate({
              path: 'sender',
              select: 'name avatar'
            }).execPopulate();

          case 9:
            populatedMessage = _context2.sent;
            _context2.next = 12;
            return _chat.Chat.findByIdAndUpdate(chatId, {
              lastMessage: message
            });

          case 12:
            chat = _context2.sent;
            chat.users.forEach(function (user) {
              var userId = user.toString();

              if (userId === sender) {
                return;
              }

              socketHandler.sendSocketMessage(req, populatedMessage, userId);
            });
            res.json(populatedMessage);
            _context2.next = 21;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](3);
            console.error(_context2.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 17]]);
  }));

  return function sendMessage(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.sendMessage = sendMessage;

var getMessagesForChatRoom = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var chatId, messages;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            chatId = req.params.chatId;
            _context3.prev = 1;
            _context3.next = 4;
            return _messages.Message.find({
              chat: chatId
            }).populate({
              path: 'sender',
              select: 'name avatar'
            }).lean().exec();

          case 4:
            messages = _context3.sent;

            if (!messages) {
              res.status(400).json({
                msg: 'No messages found'
              });
            }

            res.json(messages);
            _context3.next = 13;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](1);
            console.error(_context3.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 9]]);
  }));

  return function getMessagesForChatRoom(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getMessagesForChatRoom = getMessagesForChatRoom;