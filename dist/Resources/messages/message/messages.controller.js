"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMessage = void 0;

require("regenerator-runtime/runtime");

var _messages = _interopRequireDefault(require("./messages.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var sendMessage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, chatId, content, image, sender, message;

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
            return _messages.default.create({
              sender: sender,
              content: content,
              image: image,
              chat: chatId
            });

          case 6:
            message = _context.sent;
            res.json(message);
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](3);
            console.error(_context.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 10]]);
  }));

  return function sendMessage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendMessage = sendMessage;