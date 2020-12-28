"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bookmark = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _tweet = require("../tweets/tweet.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose.default.Types.ObjectId;
var BookmarkSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'user'
  },
  tweets: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'tweet'
  }]
});

var Bookmark = _mongoose.default.model('bookmark', BookmarkSchema);

exports.Bookmark = Bookmark;