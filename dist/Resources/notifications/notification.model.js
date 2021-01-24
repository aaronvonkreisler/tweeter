"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notification = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var NotificationShema = new Schema({
  receiver: {
    type: Schema.ObjectId,
    ref: 'user'
  },
  sender: {
    type: Schema.ObjectId,
    ref: 'user'
  },
  notificationType: {
    type: String,
    enum: ['follow', 'like', 'comment', 'mention']
  },
  notificationData: Object,
  date: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
});

var Notification = _mongoose.default.model('notification', NotificationShema);

exports.Notification = Notification;