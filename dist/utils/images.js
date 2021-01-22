"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.fill");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeImage = exports.generateUniqueFileName = void 0;

require("regenerator-runtime/runtime");

var _path = _interopRequireDefault(require("path"));

var _sharp = _interopRequireDefault(require("sharp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var generateUniqueFileName = function generateUniqueFileName(filename) {
  var extension = _path.default.extname(filename);

  var date = Date.now();
  var randomHash = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  new Array(25).fill(null).map(function (_) {
    randomHash += characters.charAt(Math.floor(Math.random() * characters.length));
  });
  return "".concat(randomHash, "-").concat(date).concat(extension);
};

exports.generateUniqueFileName = generateUniqueFileName;

var resizeImage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(width, height, buffer) {
    var resizedBuffer;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _sharp.default)(buffer).resize(width, height).webp().toBuffer();

          case 2:
            resizedBuffer = _context.sent;
            return _context.abrupt("return", resizedBuffer);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function resizeImage(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.resizeImage = resizeImage;