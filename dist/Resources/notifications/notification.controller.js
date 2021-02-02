"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveNotifications = void 0;

require("regenerator-runtime/runtime");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _notification = require("./notification.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ObjectId = _mongoose.default.Types.ObjectId;

var retrieveNotifications = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user, notifications;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = req.user.id;
            _context.prev = 1;
            _context.next = 4;
            return _notification.Notification.aggregate([{
              $match: {
                receiver: ObjectId(user)
              }
            }, {
              $sort: {
                date: -1
              }
            }, {
              $lookup: {
                from: 'users',
                localField: 'sender',
                foreignField: '_id',
                as: 'sender'
              }
            }, {
              $lookup: {
                from: 'users',
                localField: 'receiver',
                foreignField: '_id',
                as: 'receiver'
              }
            }, {
              $lookup: {
                from: 'tweets',
                localField: 'entityId',
                foreignField: '_id',
                as: 'tweet'
              }
            }, {
              $unwind: '$sender'
            }, {
              $unwind: '$receiver'
            }, {
              $unwind: '$tweet'
            }, {
              $project: {
                read: true,
                notificationType: true,
                date: true,
                entityId: true,
                'sender.name': true,
                'sender.screen_name': true,
                'sender.avatar': true,
                'sender.verified': true,
                'sender._id': true,
                'receiver._id': true,
                'receiver.name': true,
                'receiver.screen_name': true,
                tweet: true
              }
            }]);

          case 4:
            notifications = _context.sent;
            res.json(notifications);
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0.message);
            res.status(500).send('Server Error');

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function retrieveNotifications(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.retrieveNotifications = retrieveNotifications;