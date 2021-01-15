"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChatByUserId = exports.getChats = exports.createNewChat = void 0;

require("regenerator-runtime/runtime");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _chat = require("./chat.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ObjectId = _mongoose.default.Types.ObjectId;

var createNewChat = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var users, requestingUserId, isGroupChat, newChat, populatedChat;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            users = req.body.users;
            requestingUserId = req.user.id;

            if (users) {
              _context.next = 5;
              break;
            }

            console.log('Users array not sent with request');
            return _context.abrupt("return", res.status(400).json({
              msg: 'Users are required '
            }));

          case 5:
            if (users.length === 0) {
              console.log('Users array is empty');
              res.status(400).json({
                msg: 'Users array is empty'
              });
            }

            _context.prev = 6;
            users.push(requestingUserId);
            isGroupChat = users.length > 2;
            _context.next = 11;
            return _chat.Chat.create({
              users: users,
              isGroupChat: isGroupChat
            });

          case 11:
            newChat = _context.sent;
            _context.next = 14;
            return _chat.Chat.findById(newChat.id).populate({
              path: 'users',
              select: 'name screen_name avatar verified'
            });

          case 14:
            populatedChat = _context.sent;
            res.json(populatedChat);
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](6);
            console.error(_context.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 18]]);
  }));

  return function createNewChat(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createNewChat = createNewChat;

var getChats = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var requestingUserId, chats;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            requestingUserId = req.user.id;
            _context2.prev = 1;
            _context2.next = 4;
            return _chat.Chat.find({
              users: {
                $in: requestingUserId
              }
            }).populate({
              path: 'users',
              select: 'name avatar screen_name verified'
            }).sort({
              updatedAt: -1
            }).lean().exec();

          case 4:
            chats = _context2.sent;

            if (!chats) {
              res.status(404).json({
                msg: 'No chats found for this user'
              });
            }

            res.json(chats);
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

  return function getChats(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getChats = getChats;

var getChatByUserId = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var currentUser, otherUser, newChat;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            currentUser = req.user.id;
            otherUser = req.params.id;
            _context3.prev = 2;
            _context3.next = 5;
            return _chat.Chat.findOneAndUpdate({
              isGroupChat: false,
              users: {
                $size: 2,
                $all: [{
                  $elemMatch: {
                    $eq: ObjectId(currentUser)
                  }
                }, {
                  $elemMatch: {
                    $eq: ObjectId(otherUser)
                  }
                }]
              }
            }, {
              $setOnInsert: {
                users: [currentUser, otherUser]
              }
            }, {
              new: true,
              upsert: true
            }).populate({
              path: 'users',
              select: 'avatar name screen_name verified'
            });

          case 5:
            newChat = _context3.sent;
            res.json(newChat);
            _context3.next = 13;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](2);
            console.error(_context3.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 9]]);
  }));

  return function getChatByUserId(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getChatByUserId = getChatByUserId;