"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPaginatedTimelineTweets = exports.getTweetsRetweetUsers = exports.getTweetsLikedUsers = exports.getUsersLikedTweets = exports.getUsersReplies = exports.getUsersProfileTweets = exports.getTweetsReplies = exports.getTimelineTweets = exports.getTweetById = void 0;

require("regenerator-runtime/runtime");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _tweet = require("./tweet.model");

var _user = require("../user/user.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ObjectId = _mongoose.default.Types.ObjectId;

var getTweetById = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var tweet;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _tweet.Tweet.findById(req.params.id).populate('retweet').populate({
              path: 'user',
              select: 'avatar verified name email screen_name'
            }).populate({
              path: 'replies',
              populate: {
                path: 'tweet'
              }
            }).exec();

          case 3:
            tweet = _context.sent;

            if (!tweet) {
              res.status(404).json({
                msg: 'Tweet not found'
              });
            }

            res.json(tweet);
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0.message);
            res.status(500).send('Server Error');

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function getTweetById(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getTweetById = getTweetById;

var getTimelineTweets = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user, userIds, tweets;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _user.User.findById(req.user.id).lean().exec();

          case 3:
            user = _context2.sent;
            userIds = user.following.map(function (follow) {
              return follow.user;
            });
            userIds.push(req.user.id); // Exclude tweets that are replies to other tweets

            _context2.next = 8;
            return _tweet.Tweet.find({
              user: userIds,
              in_reply_to: {
                $exists: false
              }
            }).populate('retweetData').sort({
              created_at: -1
            }).exec();

          case 8:
            tweets = _context2.sent;

            if (tweets) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              msg: 'No Tweets found!'
            }));

          case 11:
            res.json(tweets);
            _context2.next = 20;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0.message);

            if (!(_context2.t0.kind === 'ObjectId')) {
              _context2.next = 19;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              msg: 'No Tweets found!'
            }));

          case 19:
            res.status(500).send('Server Error');

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 14]]);
  }));

  return function getTimelineTweets(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getTimelineTweets = getTimelineTweets;

var getTweetsReplies = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var tweetId, replies;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            tweetId = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _tweet.Tweet.find({
              in_reply_to: tweetId
            }).lean().exec();

          case 4:
            replies = _context3.sent;

            if (!replies) {
              res.status(404).json({
                msg: 'No Replies for this tweet'
              });
            }

            res.json(replies);
            _context3.next = 15;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](1);
            console.error(_context3.t0.message);

            if (!(_context3.t0.kind === 'ObjectId')) {
              _context3.next = 14;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              msg: 'No Tweets found!'
            }));

          case 14:
            res.status(500).send('Server Error');

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 9]]);
  }));

  return function getTweetsReplies(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getTweetsReplies = getTweetsReplies;

var getUsersProfileTweets = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var userId, profileTweets;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            userId = req.params.id;
            _context4.next = 4;
            return _tweet.Tweet.find({
              user: userId,
              in_reply_to: {
                $exists: false
              },
              retweetData: {
                $exists: false
              }
            }).sort({
              created_at: -1
            }).lean().exec();

          case 4:
            profileTweets = _context4.sent;

            if (!profileTweets) {
              res.status(404).json({
                msg: 'No tweets found for this user'
              });
            }

            res.json(profileTweets);
            _context4.next = 15;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);

            if (!(_context4.t0.kind === 'ObjectId')) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              msg: 'No Tweets found!'
            }));

          case 13:
            console.error(_context4.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));

  return function getUsersProfileTweets(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getUsersProfileTweets = getUsersProfileTweets;

var getUsersReplies = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var userId, replies;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            userId = req.params.id;
            _context5.next = 4;
            return _tweet.Tweet.find({
              user: userId,
              in_reply_to: {
                $exists: true
              }
            }).sort({
              created_at: -1
            }).lean().exec();

          case 4:
            replies = _context5.sent;

            if (!replies) {
              res.status(404).json({
                msg: 'No replies yet'
              });
            }

            res.json(replies);
            _context5.next = 13;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0.message);
            res.statu(500).send('Server Error');

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 9]]);
  }));

  return function getUsersReplies(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getUsersReplies = getUsersReplies;

var getUsersLikedTweets = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var userId, likedTweets;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            userId = req.params.id;
            _context6.next = 4;
            return _tweet.Tweet.find({
              'favorites.user': {
                $in: userId
              }
            }).sort({
              created_at: -1
            }).lean().exec();

          case 4:
            likedTweets = _context6.sent;

            if (!likedTweets) {
              res.status(404).json({
                msg: 'No liked tweets'
              });
            }

            res.json(likedTweets);
            _context6.next = 13;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            console.error(_context6.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));

  return function getUsersLikedTweets(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getUsersLikedTweets = getUsersLikedTweets;

var getTweetsLikedUsers = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var tweet;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _tweet.Tweet.findById(req.params.tweet_id).populate({
              path: 'favorites',
              populate: {
                path: 'user',
                select: '_id display_name screen_name name verified avatar'
              }
            }).select('-_id').lean().exec();

          case 3:
            tweet = _context7.sent;

            if (!tweet) {
              res.status(404).json({
                msg: 'Tweet not found'
              });
            }

            res.json(tweet.favorites);
            _context7.next = 12;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](0);
            console.error(_context7.t0.message);
            res.status(500).send('Server Error');

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 8]]);
  }));

  return function getTweetsLikedUsers(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getTweetsLikedUsers = getTweetsLikedUsers;

var getTweetsRetweetUsers = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var tweet;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _tweet.Tweet.find({
              retweet: req.params.tweet_id
            }).populate({
              path: 'user',
              select: '_id display_name screen_name name verified avatar'
            }).select('user -_id').lean().exec();

          case 3:
            tweet = _context8.sent;

            if (!tweet) {
              res.status(400).json({
                msg: 'Tweet has not been retweeted'
              });
            }

            res.json(tweet);
            _context8.next = 12;
            break;

          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8["catch"](0);
            console.error(_context8.t0.message);
            res.status(500).send('Server Error');

          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 8]]);
  }));

  return function getTweetsRetweetUsers(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getTweetsRetweetUsers = getTweetsRetweetUsers;

var getPaginatedTimelineTweets = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var offset, user, following, unwantedUserFields, tweets;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            offset = req.params.offset;
            _context9.prev = 1;
            _context9.next = 4;
            return _user.User.findById(req.user.id).lean().exec();

          case 4:
            user = _context9.sent;
            following = user.following.map(function (follow) {
              return follow.user;
            });
            unwantedUserFields = ['user.password', 'user.email', 'user.retweets', 'user.backgroundPicture', 'user.pinnedTweet', 'user.following', 'user.followers', 'user.bio', 'user.location', 'user.website', 'user.createdAt', 'user.__v'];
            _context9.next = 9;
            return _tweet.Tweet.aggregate([{
              $match: {
                in_reply_to: {
                  $exists: false
                },
                $or: [{
                  user: {
                    $in: following
                  }
                }, {
                  user: ObjectId(user._id)
                }]
              }
            }, {
              $sort: {
                createdAt: -1
              }
            }, {
              $skip: Number(offset)
            }, {
              $limit: 10
            }, {
              $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
              }
            }, {
              $unset: [].concat(unwantedUserFields)
            }]);

          case 9:
            tweets = _context9.sent;
            res.json(tweets);
            _context9.next = 19;
            break;

          case 13:
            _context9.prev = 13;
            _context9.t0 = _context9["catch"](1);
            console.error(_context9.t0.message);

            if (!(_context9.t0.kind === 'ObjectId')) {
              _context9.next = 18;
              break;
            }

            return _context9.abrupt("return", res.status(404).json({
              msg: 'No Tweets found!'
            }));

          case 18:
            res.status(500).send('Server Error');

          case 19:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 13]]);
  }));

  return function getPaginatedTimelineTweets(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.getPaginatedTimelineTweets = getPaginatedTimelineTweets;