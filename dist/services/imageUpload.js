"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadPhoto = void 0;

require("regenerator-runtime/runtime");

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _keys = _interopRequireDefault(require("../config/keys"));

var _images = require("../utils/images");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_awsSdk.default.config.update({
  secretAccessKey: _keys.default.secrets.awsSecretAccessKey,
  accessKeyId: _keys.default.secrets.awsAccessKey,
  region: 'us-east-2'
});

var s3 = new _awsSdk.default.S3({
  params: {
    Bucket: 'tweeter-dev'
  }
});

var uploadPhoto = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(files) {
    var upload;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            upload = new _awsSdk.default.S3.ManagedUpload({
              params: {
                Body: files.image.data,
                Key: (0, _images.generateUniqueFileName)(files.image.name),
                ACL: 'public-read'
              },
              service: s3
            });
            _context.next = 3;
            return upload.promise();

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function uploadPhoto(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadPhoto = uploadPhoto;