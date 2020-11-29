"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("regenerator-runtime/runtime");

var _expressValidator = require("express-validator");

var _tweet = require("./tweet.model");

var _user = require("../user/user.model");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// TODO - Fetch all tweets from a users following
// TODO - Retweet
var getTimelineTweets = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user.User.findById(req.user.id).lean().exec();

          case 3:
            user = _context.sent;
            _context.next = 8;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function getTimelineTweets(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();