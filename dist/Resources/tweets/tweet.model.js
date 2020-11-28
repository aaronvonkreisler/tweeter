"use strict";

require("core-js/modules/es.number.constructor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tweet = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TweetSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'users'
  },
  display_name: String,
  screen_name: String,
  avatar: String,
  verified: Boolean,
  content: {
    type: String //required: true,

  },
  favorites: [{
    user: {
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  favorites_count: {
    type: Number,
    default: 0
  },
  replies: [{
    user: {
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'users'
    },
    content: {
      type: String,
      required: true
    },
    name: String,
    avatar: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  replies_count: {
    type: Number,
    default: 0
  },
  retweet: {
    originalTweetId: {
      type: _mongoose.default.Schema.Types.ObjectId
    },
    original_display_name: String,
    original_screen_name: String,
    original_avatar: String,
    original_content: String,
    original_verified: Boolean,
    original_timestamp: Date
  },
  retweet_count: {
    type: Number,
    default: 0
  },
  entities: {
    hashtags: [String],
    user_mentions: [String]
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Tweet = _mongoose.default.model('tweet', TweetSchema);

exports.Tweet = Tweet;