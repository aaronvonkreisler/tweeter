"use strict";

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
    default: 'https://tweeter-dev.s3.us-east-2.amazonaws.com/Profile_avatar_placeholder_large.png'
  },
  backgroundPicture: String,
  bio: String,
  pinnedTweet: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'tweet'
  },
  retweets: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'tweet'
  }],
  following: [{
    user: {
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'user'
    }
  }],
  followers: [{
    user: {
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'user'
    }
  }],
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
}); // UserSchema.post('remove',async function (doc, next) {
//    await User.updateMany({ following: doc._id }, { retweet: null });
// })

var User = _mongoose.default.model('user', UserSchema);

exports.User = User;