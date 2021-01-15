"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessagesForChatRoom = exports.sendMessage = void 0;

require("regenerator-runtime/runtime");

var _messages = require("./messages.model");

var _chat = require("../chat/chat.model");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var sendMessage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, chatId, content, image, sender, message, populatedMessage;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, chatId = _req$body.chatId, content = _req$body.content, image = _req$body.image;
            sender = req.user.id;

            if (!chatId) {
              console.log('No Chat ID in request');
              res.status(400).json({
                msg: 'Chat ID must be present in request'
              });
            }

            _context.prev = 3;
            _context.next = 6;
            return _messages.Message.create({
              sender: sender,
              content: content,
              image: image,
              chat: chatId
            });

          case 6:
            message = _context.sent;
            _context.next = 9;
            return message.populate({
              path: 'sender',
              select: 'name avatar'
            }).execPopulate();

          case 9:
            populatedMessage = _context.sent;
            _context.next = 12;
            return _chat.Chat.findByIdAndUpdate(chatId, {
              latestMessage: message
            });

          case 12:
            res.json(populatedMessage);
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](3);
            console.error(_context.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 15]]);
  }));

  return function sendMessage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendMessage = sendMessage;

var getMessagesForChatRoom = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var chatId, messages;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            chatId = req.params.chatId;
            _context2.prev = 1;
            _context2.next = 4;
            return _messages.Message.find({
              chat: chatId
            }).populate({
              path: 'sender',
              select: 'name avatar'
            }).lean().exec();

          case 4:
            messages = _context2.sent;

            if (!messages) {
              res.status(400).json({
                msg: 'No messages found'
              });
            }

            res.json(messages);
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.error(_context2.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));

  return function getMessagesForChatRoom(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getMessagesForChatRoom = getMessagesForChatRoom;