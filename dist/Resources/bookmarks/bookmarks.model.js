"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bookmark = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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