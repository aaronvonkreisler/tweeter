"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentUsersProfile = exports.uploadUserBackgroundPic = void 0;

require("regenerator-runtime/runtime");

var _profile = require("./profile.model");

var _imageUpload = require("../../services/imageUpload");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// TODO -- handle error if file size is too large. defaults to 403 status
var uploadUserBackgroundPic = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var files, regex, backgroundPicResponse, profileFields, profile;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            files = req.files;
            regex = /(image\/jpg)|(image\/jpeg)|(image\/png)/i;

            if (files.image.mimetype.match(regex)) {
              _context.next = 7;
              break;
            }

            res.status(422).json({
              msg: 'Invalid file type. Please upload a JPG or PNG filetype.'
            });
            _context.next = 15;
            break;

          case 7:
            _context.next = 9;
            return (0, _imageUpload.uploadPhoto)(files);

          case 9:
            backgroundPicResponse = _context.sent;
            profileFields = {
              user: req.user.id,
              background_picture: backgroundPicResponse.Location
            };
            _context.next = 13;
            return _profile.Profile.findOneAndUpdate({
              user: req.user.id
            }, {
              $set: profileFields
            }, {
              new: true,
              upsert: true,
              setDefaultsOnInsert: true
            }).populate({
              path: 'user',
              select: '-password'
            });

          case 13:
            profile = _context.sent;
            res.json(profile);

          case 15:
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            res.status(500).send('Server Error');

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));

  return function uploadUserBackgroundPic(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadUserBackgroundPic = uploadUserBackgroundPic;

var getCurrentUsersProfile = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var profile;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _profile.Profile.find({
              user: req.user.id
            }).populate({
              path: 'user',
              select: '-password'
            }).exec();

          case 3:
            profile = _context2.sent;

            if (!profile) {
              res.status(404).json({
                msg: 'No profile found'
              });
            }

            res.json(profile);
            _context2.next = 14;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0.message);

            if (!(_context2.t0.kind === 'ObjectId')) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              msg: 'No Profile found!'
            }));

          case 13:
            res.status(500).send('Server Error');

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function getCurrentUsersProfile(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getCurrentUsersProfile = getCurrentUsersProfile;