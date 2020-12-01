"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

require("regenerator-runtime/runtime");

var _express = _interopRequireDefault(require("express"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _db = require("./utils/db");

var _auth = require("./utils/auth");

var _user = _interopRequireDefault(require("./Resources/user/user.router"));

var _auth2 = _interopRequireDefault(require("./Resources/auth/auth.router"));

var _tweet = _interopRequireDefault(require("./Resources/tweets/tweet.router"));

var _profile = _interopRequireDefault(require("./Resources/profile/profile.router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express.default)();
app.disable('x-powered-by'); //Middleware

app.use((0, _cors.default)());
app.use(_express.default.json({
  extended: false
}));
app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _expressFileupload.default)({
  limits: {
    fileSize: 50 * 1024 * 1024
  },
  abortOnLimit: true
})); // app.use(bodyParser.json());
// Define Routes

app.use('/auth', _auth2.default);
app.use('/api', _auth.protect);
app.use('/api/user', _user.default);
app.use('/api/tweets', _tweet.default);
app.use('/api/profile', _profile.default);
var PORT = process.env.PORT || 5000;

var start = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _db.connectDB)();

          case 3:
            app.listen(PORT, function () {
              return console.log("Server started on port ".concat(PORT));
            });
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0.message);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

exports.start = start;