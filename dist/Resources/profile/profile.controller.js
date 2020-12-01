"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrUpdateProfile = void 0;

require("regenerator-runtime/runtime");

var _profile = require("./profile.model");

var _imageUpload = require("../../services/imageUpload");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createOrUpdateProfile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var body, files, regex, response, profileFields, profile;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            body = req.body, files = req.files;
            regex = /(image\/jpg)|(image\/jpeg)|(image\/png)/i;

            if (files.image.mimetype.match(regex)) {
              _context.next = 7;
              break;
            }

            res.status(422).json({
              msg: 'Invalid file type'
            });
            _context.next = 16;
            break;

          case 7:
            _context.next = 9;
            return (0, _imageUpload.uploadPhoto)(files);

          case 9:
            response = _context.sent;

            if (res.status === 413) {
              console.log('it worked');
            }

            profileFields = {
              user: req.user.id,
              profile_picture: response.Location
            };
            _context.next = 14;
            return _profile.Profile.findOneAndUpdate({
              user: req.user.id
            }, {
              $set: profileFields
            }, {
              new: true,
              upsert: true,
              setDefaultsOnInsert: true
            });

          case 14:
            profile = _context.sent;
            res.json(profile);

          case 16:
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0.message);
            res.status(500).send('Server Error');

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 18]]);
  }));

  return function createOrUpdateProfile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createOrUpdateProfile = createOrUpdateProfile;