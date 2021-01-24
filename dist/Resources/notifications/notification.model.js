"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notification = void 0;

require("regenerator-runtime/runtime");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Schema = _mongoose.default.Schema;
var NotificationShema = new Schema({
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  notificationType: {
    type: String,
    enum: ['follow', 'like', 'reply', 'mention', 'retweet', 'message']
  },
  entityId: Schema.Types.ObjectId,
  date: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
});

NotificationShema.statics.insertNotification = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(receiver, sender, notificationType, entityId) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = {
              sender: sender,
              receiver: receiver,
              notificationType: notificationType,
              entityId: entityId
            };
            _context.next = 3;
            return Notification.deleteOne(data).catch(function (err) {
              return console.log(err);
            });

          case 3:
            return _context.abrupt("return", Notification.create(data).catch(function (err) {
              return console.log(err);
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var Notification = _mongoose.default.model('notification', NotificationShema);

exports.Notification = Notification;