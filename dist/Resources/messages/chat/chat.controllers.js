"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChats = exports.createNewChat = void 0;

require("regenerator-runtime/runtime");

var _chat = require("./chat.model");

var _user = require("../../user/user.model");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createNewChat = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var users, requestingUserId, newChat;
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
            _context.next = 10;
            return _chat.Chat.create({
              users: users,
              isGroupChat: true
            });

          case 10:
            newChat = _context.sent;
            res.json(newChat);
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](6);
            console.error(_context.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 14]]);
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