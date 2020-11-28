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
  favorites_count: Number,
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
  replies_count: Number,
  retweet: {
    originalTweetId: {
      type: _mongoose.default.Schema.Types.ObjectId
    }
  },
  retweet_count: Number,
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