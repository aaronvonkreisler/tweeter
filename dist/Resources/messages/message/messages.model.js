"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageSchema = new _mongoose.default.Schema({
  sender: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'user'
  },
  content: {
    type: String,
    trim: true
  },
  image: String,
  chat: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'chat'
  },
  readBy: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'user'
  }]
}, {
  timestamps: true
});

var Message = _mongoose.default.model('message', MessageSchema);

exports.Message = Message;