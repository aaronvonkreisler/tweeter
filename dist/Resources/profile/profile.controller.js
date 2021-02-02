"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProfileByScreenName = exports.getCurrentUsersProfile = void 0;

require("regenerator-runtime/runtime");

var _profile = require("./profile.model");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getCurrentUsersProfile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var profile;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _profile.Profile.find({
              user: req.user.id
            }).populate({
              path: 'user',
              select: '-password'
            }).exec();

          case 3:
            profile = _context.sent;

            if (!profile) {
              res.status(404).json({
                msg: 'No profile found'
              });
            }

            res.json(profile);
            _context.next = 14;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0.message);

            if (!(_context.t0.kind === 'ObjectId')) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              msg: 'No Profile found!'
            }));

          case 13:
            res.status(500).json({
              msg: 'Server Error'
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function getCurrentUsersProfile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getCurrentUsersProfile = getCurrentUsersProfile;

var getProfileByScreenName = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var profile;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _profile.Profile.findOne({
              screen_name: req.params.screen_name
            }).populate({
              path: 'user',
              select: '-password'
            });

          case 3:
            profile = _context2.sent;

            if (profile) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              msg: 'No profile found'
            }));

          case 6:
            res.json(profile);
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0.message);
            res.status(500).json({
              msg: 'Server Error'
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function getProfileByScreenName(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getProfileByScreenName = getProfileByScreenName;