"use strict";

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
  content: {
    type: String
  },
  image: String,
  in_reply_to: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'tweet'
  },
  favorites: [{
    user: {
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'user'
    }
  }],
  replies: [{
    user: {
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'user'
    },
    tweet: {
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'tweet'
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  bookmarkedBy: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'user'
  }],
  retweetUsers: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'user'
  }],
  retweetData: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'tweet'
  },
  pinned: Boolean,
  created_at: {
    type: Date,
    default: Date.now
  }
});
TweetSchema.pre('find', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          this.populate({
            path: 'user',
            select: 'avatar verified name screen_name'
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
TweetSchema.pre('remove', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(doc, next) {
    var tweet;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // TODO -- remove tweet reference from bookmark model
            tweet = this;
            _context2.prev = 1;
            _context2.next = 4;
            return Tweet.deleteMany({
              retweetData: tweet._id
            });

          case 4:
            _context2.next = 6;
            return _mongoose.default.model('bookmark').updateMany({
              tweets: {
                $in: [tweet._id]
              }
            }, {
              $pull: {
                tweets: tweet._id
              }
            });

          case 6:
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            next(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 8]]);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}());

var Tweet = _mongoose.default.model('tweet', TweetSchema);

exports.Tweet = Tweet;