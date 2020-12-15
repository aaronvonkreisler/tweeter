"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _profile = require("./profile.controller");

var router = (0, _express.Router)();
router.get('/', _profile.getCurrentUsersProfile); // @route            PUT api/profile/background
// @description      Update background Picture

router.put('/background', _profile.uploadUserBackgroundPic);
var _default = router;
exports.default = _default;