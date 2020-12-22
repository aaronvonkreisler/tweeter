"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removePinnedTweet = exports.pinTweetToProfile = exports.deleteReply = exports.replytoTweet = exports.retweet = exports.removeFavorite = exports.favoriteTweet = exports.deleteTweet = exports.createTweet = void 0;

require("regenerator-runtime/runtime");

var _expressValidator = require("express-validator");

var _tweet = require("./tweet.model");

var _user = require("../user/user.model");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createTweet = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var errors, newTweet, tweet;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return _tweet.Tweet.create({
              user: req.user.id,
              content: req.body.content
            });

          case 6:
            newTweet = _context.sent;
            _context.next = 9;
            return _tweet.Tweet.findById(newTweet._id).populate({
              path: 'user',
              select: 'avatar name screen_name verified'
            });

          case 9:
            tweet = _context.sent;
            res.json(tweet);
            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](3);
            console.error(_context.t0.message);
            res.status(500).send('Server Error');

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 13]]);
  }));

  return function createTweet(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createTweet = createTweet;

var deleteTweet = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var tweet;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _tweet.Tweet.findById(req.params.id);

          case 3:
            tweet = _context2.sent;

            if (tweet) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              msg: 'Tweet not found!'
            }));

          case 6:
            if (!(tweet.user.toString() !== req.user.id)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              msg: 'User not authorized to perform this action'
            }));

          case 8:
            _context2.next = 10;
            return tweet.remove();

          case 10:
            res.json({
              msg: 'Tweet successfully removed'
            });
            _context2.next = 19;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0.message);

            if (!(_context2.t0.kind === 'ObjectId')) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              msg: 'Tweet not found!'
            }));

          case 18:
            res.status(500).send('Server Error');

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function deleteTweet(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deleteTweet = deleteTweet;

var favoriteTweet = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var tweet;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _tweet.Tweet.findByIdAndUpdate(req.params.id, {
              $addToSet: {
                favorites: {
                  user: req.user.id
                }
              }
            }, {
              new: true
            }).exec();

          case 3:
            tweet = _context3.sent;
            res.json(tweet.favorites);
            _context3.next = 11;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0.message);
            res.status(500).send('Server Error');

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function favoriteTweet(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.favoriteTweet = favoriteTweet;

var removeFavorite = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var tweet;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _tweet.Tweet.findByIdAndUpdate(req.params.id, {
              $pull: {
                favorites: {
                  user: req.user.id
                }
              }
            }, {
              new: true
            }).exec();

          case 3:
            tweet = _context4.sent;
            res.json(tweet.favorites);
            _context4.next = 11;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0.message);
            res.status(500).send('Server Error');

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function removeFavorite(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.removeFavorite = removeFavorite;

var retweet = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var tweetId, userId, deletedTweet, option, _retweet, user, tweet;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            tweetId = req.params.id;
            userId = req.user.id; // Try and delete retweet. If delete is successfull, that means user has
            // already retweeted and is trying to remove retweet.

            _context5.next = 5;
            return _tweet.Tweet.findOneAndDelete({
              user: userId,
              retweetData: tweetId
            });

          case 5:
            deletedTweet = _context5.sent;
            // if (!deletedTweet) {
            //    res.sendStatus(400);
            // }
            option = deletedTweet !== null ? '$pull' : '$addToSet';
            _retweet = deletedTweet;

            if (!(_retweet === null)) {
              _context5.next = 12;
              break;
            }

            _context5.next = 11;
            return _tweet.Tweet.create({
              user: userId,
              retweetData: tweetId
            });

          case 11:
            _retweet = _context5.sent;

          case 12:
            _context5.next = 14;
            return _user.User.findByIdAndUpdate(userId, _defineProperty({}, option, {
              retweets: _retweet._id
            }), {
              new: true
            });

          case 14:
            user = _context5.sent;
            _context5.next = 17;
            return _tweet.Tweet.findByIdAndUpdate(tweetId, _defineProperty({}, option, {
              retweetUsers: userId
            }), {
              new: true
            }).populate({
              path: 'user',
              select: 'avatar screen_name verified name '
            });

          case 17:
            tweet = _context5.sent;
            res.json(tweet);
            _context5.next = 25;
            break;

          case 21:
            _context5.prev = 21;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0.message);
            res.status(500).send('Server Error');

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 21]]);
  }));

  return function retweet(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.retweet = retweet;

var replytoTweet = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var errors, reply, tweetToSend;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 3:
            _context6.prev = 3;
            _context6.next = 6;
            return _tweet.Tweet.create({
              user: req.user.id,
              content: req.body.content,
              in_reply_to: req.params.tweet_id
            });

          case 6:
            reply = _context6.sent;
            _context6.next = 9;
            return _tweet.Tweet.findByIdAndUpdate(req.params.tweet_id, {
              $push: {
                replies: {
                  user: req.user.id,
                  tweet: reply._id
                }
              },
              $inc: {
                replies_count: 1
              }
            });

          case 9:
            _context6.next = 11;
            return _tweet.Tweet.findById(reply._id).populate({
              path: 'user',
              select: 'avatar verified name screen_name'
            });

          case 11:
            tweetToSend = _context6.sent;
            res.json(tweetToSend);
            _context6.next = 19;
            break;

          case 15:
            _context6.prev = 15;
            _context6.t0 = _context6["catch"](3);
            console.error(_context6.t0.message);
            res.status(500).send('Server Error');

          case 19:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 15]]);
  }));

  return function replytoTweet(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.replytoTweet = replytoTweet;

var deleteReply = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var tweet, reply, removeIndex;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _tweet.Tweet.findById(req.params.tweet_id);

          case 3:
            tweet = _context7.sent;
            reply = tweet.replies.find(function (reply) {
              return reply.id === req.params.reply_id;
            });

            if (reply) {
              _context7.next = 7;
              break;
            }

            return _context7.abrupt("return", res.status(400).json({
              msg: 'Reply does not exist'
            }));

          case 7:
            if (!(reply.user.toString() !== req.user.id)) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return", res.status(401).json({
              msg: 'Not authorized to perform this action'
            }));

          case 9:
            removeIndex = tweet.replies.map(function (reply) {
              return reply.user.toString().indexOf(req.user.id);
            });
            tweet.replies.splice(removeIndex, 1);
            _context7.next = 13;
            return tweet.save();

          case 13:
            res.json(tweet.replies);
            _context7.next = 20;
            break;

          case 16:
            _context7.prev = 16;
            _context7.t0 = _context7["catch"](0);
            console.error(_context7.t0.message);
            res.status(500).send('Server Error');

          case 20:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 16]]);
  }));

  return function deleteReply(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.deleteReply = deleteReply;

var pinTweetToProfile = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var tweetId, userId, tweetToPin, user;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            tweetId = req.params.id;
            userId = req.user.id;
            _context8.prev = 2;
            _context8.next = 5;
            return _tweet.Tweet.findById(tweetId).lean().exec();

          case 5:
            tweetToPin = _context8.sent;

            if (!tweetToPin) {
              res.status(404).json({
                msg: 'No Tweet found by this ID'
              });
            }

            _context8.next = 9;
            return _user.User.findByIdAndUpdate(userId, {
              pinnedTweet: tweetToPin._id
            }, {
              new: true,
              select: '-password -email'
            });

          case 9:
            user = _context8.sent;
            res.json(user);
            _context8.next = 17;
            break;

          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](2);
            console.error(_context8.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 17:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[2, 13]]);
  }));

  return function pinTweetToProfile(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.pinTweetToProfile = pinTweetToProfile;

var removePinnedTweet = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var userId, user;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            userId = req.user.id;
            _context9.prev = 1;
            _context9.next = 4;
            return _user.User.findByIdAndUpdate(userId, {
              $unset: {
                pinnedTweet: ''
              }
            }, {
              new: true,
              select: '-password -email'
            });

          case 4:
            user = _context9.sent;
            res.json(user);
            _context9.next = 12;
            break;

          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](1);
            console.error(_context9.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 12:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 8]]);
  }));

  return function removePinnedTweet(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.removePinnedTweet = removePinnedTweet;