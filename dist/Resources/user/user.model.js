"use strict";

require("core-js/modules/es.number.constructor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose.default.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  screen_name: {
    type: String,
    required: true,
    maxlength: 15,
    unique: true,
    trim: true
  },
  avatar: {
    type: String,
    default: 'http://www.avatar.com'
  },
  display_name: String,
  location: String,
  description: String,
  protected: {
    type: Boolean,
    default: false
  },
  followers_count: Number,
  following_count: Number,
  statuses_count: Number,
  default_profile: {
    type: Boolean,
    default: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
UserSchema.pre('save', function (next) {
  var _this = this;

  if (!this.isModified('password')) {
    return next();
  }

  _bcryptjs.default.hash(this.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }

    _this.password = hash;
    next();
  });
});

var User = _mongoose.default.model('user', UserSchema);

exports.User = User;