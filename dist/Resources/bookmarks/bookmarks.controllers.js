"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeTweetFromBookmarks = exports.addTweetToBookmarks = exports.getAllBookmarks = void 0;

require("regenerator-runtime/runtime");

var _tweet = require("../tweets/tweet.model");

var _bookmarks = require("./bookmarks.model");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAllBookmarks = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var userId, bookmarks;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = req.user.id;
            _context.prev = 1;
            _context.next = 4;
            return _bookmarks.Bookmark.findOne({
              user: userId
            }).populate('tweets');

          case 4:
            bookmarks = _context.sent;

            if (!bookmarks) {
              res.status(404).json({
                msg: 'No Bookmarks for this user'
              });
            }

            res.json(bookmarks);
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));

  return function getAllBookmarks(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAllBookmarks = getAllBookmarks;

var addTweetToBookmarks = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var userId, tweetId, tweet, bookmarks;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = req.user.id;
            tweetId = req.params.id;
            _context2.prev = 2;
            _context2.next = 5;
            return _tweet.Tweet.findByIdAndUpdate(tweetId, {
              $addToSet: {
                bookmarkedBy: userId
              }
            }).exec();

          case 5:
            tweet = _context2.sent;

            if (!tweet) {
              res.status(404).json({
                msg: 'No Tweet found by that ID'
              });
            }

            _context2.next = 9;
            return _bookmarks.Bookmark.findOneAndUpdate({
              user: userId
            }, {
              user: userId,
              $addToSet: {
                tweets: tweet._id
              }
            }, {
              new: true,
              upsert: true
            }).lean().exec();

          case 9:
            bookmarks = _context2.sent;
            res.json(bookmarks);
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            console.error(_context2.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));

  return function addTweetToBookmarks(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addTweetToBookmarks = addTweetToBookmarks;

var removeTweetFromBookmarks = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var userId, tweetId, tweet, bookmarks;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userId = req.user.id;
            tweetId = req.params.id;
            _context3.prev = 2;
            _context3.next = 5;
            return _tweet.Tweet.findByIdAndUpdate(tweetId, {
              $pull: {
                bookmarkedBy: userId
              }
            }).lean().exec();

          case 5:
            tweet = _context3.sent;

            if (!tweet) {
              res.status(400).send('Tweet no longer exists');
            }

            _context3.next = 9;
            return _bookmarks.Bookmark.findOneAndUpdate({
              user: userId
            }, {
              $pull: {
                tweets: tweetId
              }
            }, {
              new: true
            }).lean().exec();

          case 9:
            bookmarks = _context3.sent;
            res.json(bookmarks);
            _context3.next = 17;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](2);
            console.error(_context3.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 13]]);
  }));

  return function removeTweetFromBookmarks(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.removeTweetFromBookmarks = removeTweetFromBookmarks;