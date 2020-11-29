"use strict";

require("core-js/modules/es.array.filter");

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
exports.unfollowUser = exports.followUser = exports.fetchUserById = exports.fetchCurrentUser = void 0;

require("regenerator-runtime/runtime");

var _user = require("./user.model");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetchCurrentUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user.User.findById(req.user.id).select('-password');

          case 3:
            user = _context.sent;
            res.json(user);
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0.message);
            res.status(500).send('Server Error');

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function fetchCurrentUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchCurrentUser = fetchCurrentUser;

var fetchUserById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _user.User.findById(req.params.id).select('-password').lean().exec();

          case 3:
            user = _context2.sent;
            res.json(user);
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0.message);
            res.status(500).send('Server Error');

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function fetchUserById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.fetchUserById = fetchUserById;

var followUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var user, userToBeFollowed;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _user.User.findById(req.user.id);

          case 3:
            user = _context3.sent;
            _context3.next = 6;
            return _user.User.findById(req.params.id);

          case 6:
            userToBeFollowed = _context3.sent;

            if (!(userToBeFollowed.followers.filter(function (follower) {
              return follower.user.toString() === req.user.id;
            }).length > 0)) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              msg: 'User is already followed'
            }));

          case 9:
            userToBeFollowed.followers.unshift({
              user: req.user.id
            });
            user.following.unshift({
              user: req.params.id
            });
            _context3.next = 13;
            return userToBeFollowed.save();

          case 13:
            _context3.next = 15;
            return user.save();

          case 15:
            // Return the followers of the user who is being followed.
            res.json(userToBeFollowed.followers);
            _context3.next = 22;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0.message);
            res.status(500).send('Server Error');

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 18]]);
  }));

  return function followUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.followUser = followUser;

var unfollowUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var follower, removeIndex;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _user.User.findById(req.params.id);

          case 3:
            follower = _context4.sent;
            _context4.next = 6;
            return _user.User.findByIdAndUpdate(req.user.id, {
              $pull: {
                following: {
                  user: req.params.id
                }
              }
            }, function (err, user) {
              if (err) console.error(err.message);
            });

          case 6:
            if (!(follower.followers.filter(function (follower) {
              return follower.user.toString() === req.user.id;
            }).length === 0)) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              msg: 'User has not yet been followed'
            }));

          case 8:
            removeIndex = follower.followers.map(function (follow) {
              return follow.user.toString().indexOf(req.user.id);
            });
            follower.followers.splice(removeIndex, 1);
            _context4.next = 12;
            return follower.save();

          case 12:
            res.json(follower.followers);
            _context4.next = 19;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0.message);
            res.status(500).send('Server Error');

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 15]]);
  }));

  return function unfollowUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.unfollowUser = unfollowUser;