"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTweet = void 0;

require("regenerator-runtime/runtime");

var _expressValidator = require("express-validator");

var _tweet = require("./tweet.model");

var _user = require("../user/user.model");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// TODO - Fetch all tweets from a users following
var createTweet = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var errors, user, newTweet;
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
            return _user.User.findById(req.user.id).lean().exec();

          case 6:
            user = _context.sent;
            console.log(user);
            _context.next = 10;
            return _tweet.Tweet.create({
              user: req.user.id,
              content: req.body.content,
              display_name: user.name,
              avatar: user.avatar,
              screen_name: user.screen_name,
              verified: user.verified
            });

          case 10:
            newTweet = _context.sent;
            res.json(newTweet);
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);
            console.error(_context.t0.message);
            res.status(500).send('Server Error');

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 14]]);
  }));

  return function createTweet(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createTweet = createTweet;