"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chat = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChatSchema = new _mongoose.default.Schema({
  chatName: {
    type: String,
    trim: true
  },
  isGroupChat: {
    type: Boolean,
    default: false
  },
  users: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'user'
  }],
  lastMessage: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'message'
  }
}, {
  timestamps: true
});

var Chat = _mongoose.default.model('chat', ChatSchema);

exports.Chat = Chat;