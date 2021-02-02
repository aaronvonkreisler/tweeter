"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removePinnedTweet = exports.pinTweetToProfile = exports.replytoTweet = exports.replyToTweetWithImage = exports.retweet = exports.removeFavorite = exports.favoriteTweet = exports.deleteTweet = exports.createTweet = exports.createTweetWithImage = void 0;

require("regenerator-runtime/runtime");

var _expressValidator = require("express-validator");

var _tweet = require("./tweet.model");

var _user = require("../user/user.model");

var _notification = require("../notifications/notification.model");

var _imageUpload = require("../../services/imageUpload");

var _images = require("../../utils/images");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createTweetWithImage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var content, files, user, tweet, resizedImage, image, populatedTweet;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            content = req.body.content;
            files = req.files;
            user = req.user.id;
            tweet = undefined;

            if (files) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              msg: 'This route requires a file'
            }));

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return (0, _images.resizeImage)(560, null, files.image.data);

          case 9:
            resizedImage = _context.sent;
            _context.next = 12;
            return (0, _imageUpload.uploadImageToS3)(resizedImage);

          case 12:
            image = _context.sent;
            tweet = new _tweet.Tweet({
              user: user,
              content: content,
              image: image.Location
            });
            _context.next = 16;
            return tweet.save();

          case 16:
            _context.next = 18;
            return tweet.populate({
              path: 'user',
              select: 'avatar name screen_name verified'
            }).execPopulate();

          case 18:
            populatedTweet = _context.sent;
            res.json(populatedTweet);
            _context.next = 27;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](6);
            console.error(_context.t0.message);

            if (_context.t0.message === 'Input buffer contains unsupported image format') {
              res.status(400).json({
                msg: 'Unsupported image format'
              });
            }

            res.status(500).send('Server Error');

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 22]]);
  }));

  return function createTweetWithImage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createTweetWithImage = createTweetWithImage;

var createTweet = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user, _req$body, content, image, errors, newTweet, tweet;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = req.user.id;
            _req$body = req.body, content = _req$body.content, image = _req$body.image;
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 5:
            _context2.prev = 5;
            _context2.next = 8;
            return _tweet.Tweet.create({
              user: user,
              content: content,
              image: image
            });

          case 8:
            newTweet = _context2.sent;
            _context2.next = 11;
            return _tweet.Tweet.findById(newTweet._id).populate({
              path: 'user',
              select: 'avatarSmall name screen_name verified'
            });

          case 11:
            tweet = _context2.sent;
            res.json(tweet);
            _context2.next = 19;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](5);
            console.error(_context2.t0.message);
            res.status(500).send('Server Error');

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 15]]);
  }));

  return function createTweet(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createTweet = createTweet;

var deleteTweet = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var tweet;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _tweet.Tweet.findById(req.params.id);

          case 3:
            tweet = _context3.sent;

            if (tweet) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              msg: 'Tweet not found!'
            }));

          case 6:
            if (!(tweet.user.toString() !== req.user.id)) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.status(401).json({
              msg: 'User not authorized to perform this action'
            }));

          case 8:
            if (!(tweet.in_reply_to !== null)) {
              _context3.next = 11;
              break;
            }

            _context3.next = 11;
            return _tweet.Tweet.findByIdAndUpdate(tweet.in_reply_to, {
              $pull: {
                replies: {
                  user: tweet.user
                }
              }
            });

          case 11:
            _context3.next = 13;
            return tweet.remove();

          case 13:
            res.json({
              msg: 'Tweet successfully removed'
            });
            _context3.next = 22;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0.message);

            if (!(_context3.t0.kind === 'ObjectId')) {
              _context3.next = 21;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              msg: 'Tweet not found!'
            }));

          case 21:
            res.status(500).send('Server Error');

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 16]]);
  }));

  return function deleteTweet(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteTweet = deleteTweet;

var favoriteTweet = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var tweetId, userId, tweet;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            tweetId = req.params.id;
            userId = req.user.id;
            _context4.prev = 2;
            _context4.next = 5;
            return _tweet.Tweet.findByIdAndUpdate(tweetId, {
              $addToSet: {
                favorites: {
                  user: req.user.id
                }
              }
            }, {
              new: true
            }).exec();

          case 5:
            tweet = _context4.sent;
            _context4.next = 8;
            return _notification.Notification.insertNotification(tweet.user, userId, 'like', tweet._id);

          case 8:
            res.json(tweet.favorites);
            _context4.next = 15;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](2);
            console.error(_context4.t0.message);
            res.status(500).send('Server Error');

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 11]]);
  }));

  return function favoriteTweet(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.favoriteTweet = favoriteTweet;

var removeFavorite = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var tweet;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
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
            tweet = _context5.sent;
            res.json(tweet.favorites);
            _context5.next = 11;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0.message);
            res.status(500).send('Server Error');

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function removeFavorite(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.removeFavorite = removeFavorite;

var retweet = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var tweetId, userId, deletedTweet, option, _retweet, tweet;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            tweetId = req.params.id;
            userId = req.user.id; // Try and delete retweet. If delete is successfull, that means user has
            // already retweeted and is trying to remove retweet.

            _context6.next = 5;
            return _tweet.Tweet.findOneAndDelete({
              user: userId,
              retweetData: tweetId
            });

          case 5:
            deletedTweet = _context6.sent;
            // if (!deletedTweet) {
            //    res.sendStatus(400);
            // }
            option = deletedTweet !== null ? '$pull' : '$addToSet';
            _retweet = deletedTweet;

            if (!(_retweet === null)) {
              _context6.next = 12;
              break;
            }

            _context6.next = 11;
            return _tweet.Tweet.create({
              user: userId,
              retweetData: tweetId
            });

          case 11:
            _retweet = _context6.sent;

          case 12:
            _context6.next = 14;
            return _tweet.Tweet.findByIdAndUpdate(tweetId, _defineProperty({}, option, {
              retweetUsers: userId
            }), {
              new: true
            }).populate({
              path: 'user',
              select: 'avatarSmall screen_name verified name '
            });

          case 14:
            tweet = _context6.sent;

            if (deletedTweet) {
              _context6.next = 18;
              break;
            }

            _context6.next = 18;
            return _notification.Notification.insertNotification(tweet.user, userId, 'retweet', tweet._id);

          case 18:
            res.json(tweet);
            _context6.next = 25;
            break;

          case 21:
            _context6.prev = 21;
            _context6.t0 = _context6["catch"](0);
            console.error(_context6.t0.message);
            res.status(500).send('Server Error');

          case 25:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 21]]);
  }));

  return function retweet(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.retweet = retweet;

var replyToTweetWithImage = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var tweetId, sender, content, files, reply, originalTweet, resizedImage, image, populatedReply, isReplyingToOwnTweet;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            tweetId = req.params.tweet_id;
            sender = req.user.id;
            content = req.body.content;
            files = req.files;
            reply = undefined;

            if (files) {
              _context7.next = 7;
              break;
            }

            return _context7.abrupt("return", res.status(400).json({
              msg: 'This route requires a file'
            }));

          case 7:
            _context7.prev = 7;
            _context7.next = 10;
            return _tweet.Tweet.findByIdAndUpdate(tweetId, {
              $push: {
                replies: {
                  user: sender
                }
              }
            }, {
              new: true
            });

          case 10:
            originalTweet = _context7.sent;
            _context7.next = 13;
            return (0, _images.resizeImage)(560, null, files.image.data);

          case 13:
            resizedImage = _context7.sent;
            _context7.next = 16;
            return (0, _imageUpload.uploadImageToS3)(resizedImage);

          case 16:
            image = _context7.sent;
            reply = new _tweet.Tweet({
              user: sender,
              content: content,
              in_reply_to: originalTweet._id,
              replyingToUser: originalTweet.user.screen_name,
              image: image.Location
            });
            _context7.next = 20;
            return reply.save();

          case 20:
            _context7.next = 22;
            return reply.populate({
              path: 'user',
              select: 'avatarSmall verified name screen_name'
            }).execPopulate();

          case 22:
            populatedReply = _context7.sent;
            isReplyingToOwnTweet = originalTweet.user.toString() === sender;

            if (isReplyingToOwnTweet) {
              _context7.next = 27;
              break;
            }

            _context7.next = 27;
            return _notification.Notification.insertNotification(originalTweet.user, sender, 'reply', populatedReply._id);

          case 27:
            res.json(populatedReply);
            _context7.next = 35;
            break;

          case 30:
            _context7.prev = 30;
            _context7.t0 = _context7["catch"](7);
            console.error(_context7.t0.message);

            if (_context7.t0.message === 'Input buffer contains unsupported image format') {
              res.status(400).json({
                msg: 'Unsupported image format'
              });
            }

            res.status(500).send('Server Error');

          case 35:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[7, 30]]);
  }));

  return function replyToTweetWithImage(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.replyToTweetWithImage = replyToTweetWithImage;

var replytoTweet = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var errors, tweetId, sender, originalTweet, reply, tweetToSend, isReplyingToOwnTweet;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);
            tweetId = req.params.tweet_id;
            sender = req.user.id;

            if (errors.isEmpty()) {
              _context8.next = 5;
              break;
            }

            return _context8.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 5:
            _context8.prev = 5;
            _context8.next = 8;
            return _tweet.Tweet.findByIdAndUpdate(tweetId, {
              $push: {
                replies: {
                  user: sender
                }
              }
            }, {
              new: true
            });

          case 8:
            originalTweet = _context8.sent;
            _context8.next = 11;
            return _tweet.Tweet.create({
              user: sender,
              content: req.body.content,
              in_reply_to: originalTweet._id,
              replyingToUser: originalTweet.user.screen_name,
              image: req.body.image
            });

          case 11:
            reply = _context8.sent;
            _context8.next = 14;
            return _tweet.Tweet.findById(reply._id).populate({
              path: 'user',
              select: 'avatar verified name screen_name'
            });

          case 14:
            tweetToSend = _context8.sent;
            isReplyingToOwnTweet = originalTweet.user.toString() === sender;
            console.log(originalTweet);

            if (isReplyingToOwnTweet) {
              _context8.next = 20;
              break;
            }

            _context8.next = 20;
            return _notification.Notification.insertNotification(originalTweet.user, sender, 'reply', tweetToSend._id);

          case 20:
            res.json(tweetToSend);
            _context8.next = 27;
            break;

          case 23:
            _context8.prev = 23;
            _context8.t0 = _context8["catch"](5);
            console.error(_context8.t0.message);
            res.status(500).send('Server Error');

          case 27:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[5, 23]]);
  }));

  return function replytoTweet(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.replytoTweet = replytoTweet;

var pinTweetToProfile = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var tweetId, userId, tweetToPin;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            tweetId = req.params.id;
            userId = req.user.id;
            _context9.prev = 2;
            _context9.next = 5;
            return _tweet.Tweet.findById(tweetId).populate({
              path: 'user',
              select: 'name screen_name avatar verified'
            });

          case 5:
            tweetToPin = _context9.sent;

            if (!tweetToPin) {
              res.status(404).json({
                msg: 'No Tweet found by this ID'
              });
            }

            _context9.next = 9;
            return _user.User.findByIdAndUpdate(userId, {
              pinnedTweet: tweetToPin._id
            }, {
              new: true,
              select: '-password -email'
            });

          case 9:
            res.json(tweetToPin);
            _context9.next = 16;
            break;

          case 12:
            _context9.prev = 12;
            _context9.t0 = _context9["catch"](2);
            console.error(_context9.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[2, 12]]);
  }));

  return function pinTweetToProfile(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.pinTweetToProfile = pinTweetToProfile;

var removePinnedTweet = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var userId;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            userId = req.user.id;
            _context10.prev = 1;
            _context10.next = 4;
            return _user.User.findByIdAndUpdate(userId, {
              $unset: {
                pinnedTweet: ''
              }
            });

          case 4:
            res.json({
              msg: 'Pinned Tweet Removed'
            });
            _context10.next = 11;
            break;

          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10["catch"](1);
            console.error(_context10.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 11:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 7]]);
  }));

  return function removePinnedTweet(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.removePinnedTweet = removePinnedTweet;