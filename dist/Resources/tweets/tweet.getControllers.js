"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTweetsRetweetUsers = exports.getTweetsLikedUsers = exports.getUsersReplies = exports.getUsersTweets = exports.getTimelineTweets = exports.getTweetById = void 0;

require("regenerator-runtime/runtime");

var _expressValidator = require("express-validator");

var _tweet = require("./tweet.model");

var _user = require("../user/user.model");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// TODO - Fetch all tweets from a users following
// TODO - If Tweet has a retweet - the tweet needs to be populated
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
}(); // fetch the most recent tweets from the currently logged in users following.
// TODO -- pagination


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
            }).sort({
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

var getUsersTweets = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var tweets;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _tweet.Tweet.find({
              user: req.params.id
            }).lean().exec();

          case 3:
            tweets = _context3.sent;

            if (!tweets) {
              res.status(404).json({
                msg: 'No tweets found for this user!'
              });
            }

            res.json(tweets);
            _context3.next = 12;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0.message);
            res.status(500).send('Server Error');

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function getUsersTweets(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUsersTweets = getUsersTweets;

var getUsersReplies = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var replies;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _tweet.Tweet.find({
              'replies.user': req.params.id
            }).lean().exec();

          case 3:
            replies = _context4.sent;

            if (!replies) {
              res.status(404).json({
                msg: 'No replies yet'
              });
            }

            res.json(replies);
            _context4.next = 12;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0.message);
            res.statu(500).send('Server Error');

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));

  return function getUsersReplies(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getUsersReplies = getUsersReplies;

var getTweetsLikedUsers = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var tweet;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _tweet.Tweet.findById(req.params.tweet_id).populate({
              path: 'favorites',
              populate: {
                path: 'user',
                select: '_id display_name screen_name name verified avatar'
              }
            }).select('-_id').lean().exec();

          case 3:
            tweet = _context5.sent;

            if (!tweet) {
              res.status(404).json({
                msg: 'Tweet not found'
              });
            }

            res.json(tweet.favorites);
            _context5.next = 12;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0.message);
            res.status(500).send('Server Error');

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));

  return function getTweetsLikedUsers(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getTweetsLikedUsers = getTweetsLikedUsers;

var getTweetsRetweetUsers = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var tweet;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _tweet.Tweet.find({
              retweet: req.params.tweet_id
            }).populate({
              path: 'user',
              select: '_id display_name screen_name name verified avatar'
            }).select('user -_id').lean().exec();

          case 3:
            tweet = _context6.sent;

            if (!tweet) {
              res.status(400).json({
                msg: 'Tweet has not been retweeted'
              });
            }

            res.json(tweet);
            _context6.next = 12;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            console.error(_context6.t0.message);
            res.status(500).send('Server Error');

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 8]]);
  }));

  return function getTweetsRetweetUsers(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getTweetsRetweetUsers = getTweetsRetweetUsers;