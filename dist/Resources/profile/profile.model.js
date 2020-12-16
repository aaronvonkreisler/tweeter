"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Profile = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProfileSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'user'
  },
  screen_name: String,
  profile_picture: String,
  background_picture: String,
  bio: String,
  location: String
});

var Profile = _mongoose.default.model('profile', ProfileSchema);

exports.Profile = Profile;