"use strict";

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tweet = void 0;

require("regenerator-runtime/runtime");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var TweetSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'user'
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
      ref: 'user'
    }
  }],
  favorites_count: {
    type: Number,
    default: 0
  },
  replies: [{
    user: {
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'user'
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
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'tweet'
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
TweetSchema.post('remove', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(doc, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Tweet.updateMany({
              retweet: doc._id
            }, {
              retweet: null
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

var Tweet = _mongoose.default.model('tweet', TweetSchema);

exports.Tweet = Tweet;