"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.match");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchUsers = exports.getSuggestedUsers = exports.updateProfile = exports.getPinnedTweet = exports.fetchUsersFollowing = exports.fetchUsersFollowers = exports.uploadUserBackgroundImage = exports.uploadUserAvatar = exports.unfollowUser = exports.followUser = exports.fetchUserByUsername = exports.fetchUserById = exports.fetchCurrentUser = void 0;

require("regenerator-runtime/runtime");

var _normalizeUrl = _interopRequireDefault(require("normalize-url"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _user = require("./user.model");

var _notification = require("../notifications/notification.model");

var _imageUpload = require("../../services/imageUpload");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ObjectId = _mongoose.default.Types.ObjectId;

var fetchCurrentUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user.User.findById(req.user.id).select('-password -email').exec();

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
            res.status(500).json({
              msg: 'Server Error'
            });

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

var fetchUserByUsername = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var username, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            username = req.params.username;
            _context3.next = 4;
            return _user.User.findOne({
              screen_name: username
            }).select('-password').lean().exec();

          case 4:
            user = _context3.sent;

            if (!user) {
              res.status(404).json({
                msg: 'No user found by that username'
              });
            }

            res.json(user);
            _context3.next = 13;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function fetchUserByUsername(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.fetchUserByUsername = fetchUserByUsername;

var followUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var userId, userToFollowId, user, userToBeFollowed, isFollowing;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userId = req.user.id;
            userToFollowId = req.params.id;
            _context4.prev = 2;
            _context4.next = 5;
            return _user.User.findById(userId).select('-password');

          case 5:
            user = _context4.sent;
            _context4.next = 8;
            return _user.User.findById(userToFollowId);

          case 8:
            userToBeFollowed = _context4.sent;
            isFollowing = userToBeFollowed.followers.filter(function (follower) {
              return follower.user.toString() === req.user.id;
            }).length > 0;

            if (!isFollowing) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              msg: 'User is already followed'
            }));

          case 12:
            userToBeFollowed.followers.unshift({
              user: userId
            });
            user.following.unshift({
              user: userToFollowId
            });
            _context4.next = 16;
            return userToBeFollowed.save();

          case 16:
            _context4.next = 18;
            return user.save();

          case 18:
            _context4.next = 20;
            return _notification.Notification.insertNotification(userToFollowId, userId, 'follow', userId);

          case 20:
            /* socketHandler.sendNotification({
               will need to populate the sender field (req.user.id)
            })
            */
            // Return the followers of the user who is being followed.
            res.json(userToBeFollowed.followers);
            _context4.next = 27;
            break;

          case 23:
            _context4.prev = 23;
            _context4.t0 = _context4["catch"](2);
            console.error(_context4.t0.message);
            res.status(500).send('Server Error');

          case 27:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 23]]);
  }));

  return function followUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.followUser = followUser;

var unfollowUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var follower, removeIndex;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _user.User.findById(req.params.id);

          case 3:
            follower = _context5.sent;
            _context5.next = 6;
            return _user.User.findByIdAndUpdate(req.user.id, {
              $pull: {
                following: {
                  user: req.params.id
                }
              }
            }, function (err) {
              if (err) console.error(err.message);
            });

          case 6:
            if (!(follower.followers.filter(function (follower) {
              return follower.user.toString() === req.user.id;
            }).length === 0)) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              msg: 'User has not yet been followed'
            }));

          case 8:
            removeIndex = follower.followers.map(function (follow) {
              return follow.user.toString().indexOf(req.user.id);
            });
            follower.followers.splice(removeIndex, 1);
            _context5.next = 12;
            return follower.save();

          case 12:
            res.json(follower.followers);
            _context5.next = 19;
            break;

          case 15:
            _context5.prev = 15;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 19:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 15]]);
  }));

  return function unfollowUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.unfollowUser = unfollowUser;

var uploadUserAvatar = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var files, regex, profilePicResponse, user;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            files = req.files;
            regex = /(image\/jpg)|(image\/jpeg)|(image\/png)/i;

            if (files.image.mimetype.match(regex)) {
              _context6.next = 7;
              break;
            }

            res.status(422).json({
              msg: 'Invalid file type. Please upload a JPG or PNG filetype.'
            });
            _context6.next = 14;
            break;

          case 7:
            _context6.next = 9;
            return (0, _imageUpload.uploadImageToS3)(files);

          case 9:
            profilePicResponse = _context6.sent;
            _context6.next = 12;
            return _user.User.findByIdAndUpdate(req.user.id, {
              avatar: profilePicResponse.Location
            }, {
              new: true,
              select: '-password -email'
            });

          case 12:
            user = _context6.sent;
            res.json(user);

          case 14:
            _context6.next = 20;
            break;

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6["catch"](0);
            console.error(_context6.t0);
            res.status(500).send('Server Error');

          case 20:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 16]]);
  }));

  return function uploadUserAvatar(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.uploadUserAvatar = uploadUserAvatar;

var uploadUserBackgroundImage = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var files, regex, backgroundPicResponse, user;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            files = req.files;
            regex = /(image\/jpg)|(image\/jpeg)|(image\/png)/i;

            if (files.image.mimetype.match(regex)) {
              _context7.next = 7;
              break;
            }

            res.status(422).json({
              msg: 'Invalid file type. Please upload a JPG or PNG filetype.'
            });
            _context7.next = 14;
            break;

          case 7:
            _context7.next = 9;
            return (0, _imageUpload.uploadImageToS3)(files);

          case 9:
            backgroundPicResponse = _context7.sent;
            _context7.next = 12;
            return _user.User.findByIdAndUpdate(req.user.id, {
              backgroundPicture: backgroundPicResponse.Location
            }, {
              new: true,
              select: '-password -email'
            });

          case 12:
            user = _context7.sent;
            res.json(user);

          case 14:
            _context7.next = 20;
            break;

          case 16:
            _context7.prev = 16;
            _context7.t0 = _context7["catch"](0);
            console.error(_context7.t0);
            res.status(500).send('Server Error');

          case 20:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 16]]);
  }));

  return function uploadUserBackgroundImage(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.uploadUserBackgroundImage = uploadUserBackgroundImage;

var fetchUsersFollowers = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var username, user;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            username = req.params.username;
            _context8.next = 4;
            return _user.User.findOne({
              screen_name: username
            }).populate({
              path: 'followers',
              populate: {
                path: 'user',
                select: '-password -email -retweets'
              }
            });

          case 4:
            user = _context8.sent;

            if (!user) {
              res.status(404).json({
                msg: 'No user found by this username'
              });
            }

            res.json(user.followers);
            _context8.next = 13;
            break;

          case 9:
            _context8.prev = 9;
            _context8.t0 = _context8["catch"](0);
            console.error(_context8.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 13:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 9]]);
  }));

  return function fetchUsersFollowers(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.fetchUsersFollowers = fetchUsersFollowers;

var fetchUsersFollowing = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var username, user;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            username = req.params.username;
            _context9.next = 4;
            return _user.User.findOne({
              screen_name: username
            }).populate({
              path: 'following',
              populate: {
                path: 'user',
                select: '-password -email -retweets'
              }
            });

          case 4:
            user = _context9.sent;

            if (!user) {
              res.status(404).json({
                msg: 'No user found by this username'
              });
            }

            res.json(user.following);
            _context9.next = 13;
            break;

          case 9:
            _context9.prev = 9;
            _context9.t0 = _context9["catch"](0);
            console.error(_context9.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 9]]);
  }));

  return function fetchUsersFollowing(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.fetchUsersFollowing = fetchUsersFollowing;

var getPinnedTweet = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var username, user;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            username = req.params.username;
            _context10.prev = 1;
            _context10.next = 4;
            return _user.User.findOne({
              screen_name: username
            }).populate('pinnedTweet');

          case 4:
            user = _context10.sent;
            res.json(user.pinnedTweet);
            _context10.next = 12;
            break;

          case 8:
            _context10.prev = 8;
            _context10.t0 = _context10["catch"](1);
            console.error(_context10.t0.message);
            res.status(500).send('Server Error');

          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 8]]);
  }));

  return function getPinnedTweet(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.getPinnedTweet = getPinnedTweet;

var updateProfile = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    var userId, _req$body, name, bio, website, location, updateFields, user;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            userId = req.user.id;
            _req$body = req.body, name = _req$body.name, bio = _req$body.bio, website = _req$body.website, location = _req$body.location;
            updateFields = {
              name: name,
              bio: bio,
              location: location,
              website: website && website !== '' ? (0, _normalizeUrl.default)(website, {
                forceHttps: true
              }) : ''
            };
            _context11.prev = 3;
            _context11.next = 6;
            return _user.User.findByIdAndUpdate(userId, {
              $set: updateFields
            }, {
              new: true
            }).select('-password -email').lean().exec();

          case 6:
            user = _context11.sent;
            res.json(user);
            _context11.next = 14;
            break;

          case 10:
            _context11.prev = 10;
            _context11.t0 = _context11["catch"](3);
            console.error(_context11.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 14:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[3, 10]]);
  }));

  return function updateProfile(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

exports.updateProfile = updateProfile;

var getSuggestedUsers = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
    var max, user, users;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            max = req.params.max;
            _context12.next = 3;
            return _user.User.findById(req.user.id);

          case 3:
            user = _context12.sent;
            _context12.prev = 4;
            _context12.next = 7;
            return _user.User.aggregate([{
              $match: {
                _id: {
                  $ne: ObjectId(user._id)
                },
                'followers.user': {
                  $ne: ObjectId(user._id)
                }
              }
            }, {
              $project: {
                screen_name: true,
                name: true,
                bio: true,
                avatar: true,
                verified: true,
                followers: true
              }
            }, {
              $sample: {
                size: max ? Number(max) : 20
              }
            }]);

          case 7:
            users = _context12.sent;
            res.json(users);
            _context12.next = 15;
            break;

          case 11:
            _context12.prev = 11;
            _context12.t0 = _context12["catch"](4);
            console.error(_context12.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 15:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[4, 11]]);
  }));

  return function getSuggestedUsers(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

exports.getSuggestedUsers = getSuggestedUsers;

var searchUsers = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
    var _req$params, searchTerm, offset, users;

    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _req$params = req.params, searchTerm = _req$params.searchTerm, offset = _req$params.offset;

            if (searchTerm) {
              _context13.next = 3;
              break;
            }

            return _context13.abrupt("return", res.status(400).json({
              error: 'Please provide a user to search for.'
            }));

          case 3:
            _context13.prev = 3;
            _context13.next = 6;
            return _user.User.aggregate([{
              $match: {
                $or: [{
                  name: {
                    $regex: new RegExp(searchTerm),
                    $options: 'i'
                  }
                }, {
                  screen_name: {
                    $regex: new RegExp(searchTerm),
                    $options: 'i'
                  }
                }]
              }
            }, {
              $skip: Number(offset)
            }, {
              $limit: 10
            }, {
              $project: {
                _id: true,
                name: true,
                screen_name: true,
                avatar: true,
                verified: true
              }
            }]);

          case 6:
            users = _context13.sent;

            if (!(users.length === 0)) {
              _context13.next = 9;
              break;
            }

            return _context13.abrupt("return", res.status(404).json({
              msg: 'Could not find any users'
            }));

          case 9:
            res.json(users);
            _context13.next = 16;
            break;

          case 12:
            _context13.prev = 12;
            _context13.t0 = _context13["catch"](3);
            console.error(_context13.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 16:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[3, 12]]);
  }));

  return function searchUsers(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();

exports.searchUsers = searchUsers;