"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tweet = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TweetSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.SchemaType.ObjectId,
    ref: 'users'
  },
  createdAt: {
    type: Date,
    required: true
  },
  text: String,
  content: {
    type: Object //required: true,

  }
});

var Tweet = _mongoose.default.model('tweet', TweetSchema);

exports.Tweet = Tweet;