"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _profile = require("./profile.controller");

var router = (0, _express.Router)();
router.get('/', _profile.getCurrentUsersProfile); // @route            GET api/profile/:id
// @description      Get a profile by user Id

router.get('/:screen_name', _profile.getProfileByScreenName);
var _default = router;
exports.default = _default;