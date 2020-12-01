"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.newToken = void 0;

require("regenerator-runtime/runtime");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _keys = _interopRequireDefault(require("../config/keys"));

var _user = require("../Resources/user/user.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var newToken = function newToken(user) {
  return _jsonwebtoken.default.sign({
    user: {
      id: user.id
    }
  }, _keys.default.jwt, {
    expiresIn: _keys.default.jwtExp
  });
};

exports.newToken = newToken;

var protect = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, decoded;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.header('x-auth-token');

            if (token) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              msg: 'Unauthorized'
            }));

          case 3:
            try {
              decoded = _jsonwebtoken.default.verify(token, _keys.default.jwt);
              req.user = decoded.user;
              next();
            } catch (err) {
              console.error(err.message);
              res.status(500).json({
                msg: 'Token is not valid'
              });
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function protect(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.protect = protect;