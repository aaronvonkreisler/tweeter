"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.fill");

require("core-js/modules/es.array.map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUniqueFileName = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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