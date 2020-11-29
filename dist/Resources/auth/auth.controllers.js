"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.signIn = void 0;

require("regenerator-runtime/runtime");

var _expressValidator = require("express-validator");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _user = require("../user/user.model");

var _auth = require("../../utils/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signIn = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, password, errors, user, isMatch, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 4:
            _context.prev = 4;
            _context.next = 7;
            return _user.User.findOne({
              email: email
            });

          case 7:
            user = _context.sent;

            if (user) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              errors: [{
                msg: 'Invalid Credentials'
              }]
            }));

          case 10:
            _context.next = 12;
            return _bcryptjs.default.compare(password, user.password);

          case 12:
            isMatch = _context.sent;

            if (isMatch) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              errors: [{
                msg: 'Invalid Credentials'
              }]
            }));

          case 15:
            token = (0, _auth.newToken)(user);
            return _context.abrupt("return", res.status(201).send({
              token: token
            }));

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](4);
            console.error(_context.t0);
            res.status(500).send('Server Error');

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 19]]);
  }));

  return function signIn(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signIn = signIn;

var register = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, email, password, date_of_birth, name, screen_name, errors, user, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, date_of_birth = _req$body2.date_of_birth, name = _req$body2.name, screen_name = _req$body2.screen_name;
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 4:
            _context2.prev = 4;
            _context2.next = 7;
            return _user.User.findOne({
              email: email
            });

          case 7:
            user = _context2.sent;

            if (!user) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              errors: [{
                msg: 'User already exists'
              }]
            }));

          case 10:
            _context2.next = 12;
            return _user.User.create({
              name: name,
              email: email,
              password: password,
              date_of_birth: date_of_birth,
              screen_name: screen_name
            });

          case 12:
            user = _context2.sent;
            token = (0, _auth.newToken)(user);
            return _context2.abrupt("return", res.status(201).send({
              token: token
            }));

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](4);

            if (!(_context2.t0.name === 'MongoError' && _context2.t0.code === 11000)) {
              _context2.next = 21;
              break;
            }

            return _context2.abrupt("return", res.status(422).send({
              errors: [{
                msg: 'Username is taken'
              }]
            }));

          case 21:
            console.error(_context2.t0.message);
            res.status(500).send('Server Error');

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 17]]);
  }));

  return function register(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.register = register;