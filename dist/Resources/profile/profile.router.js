"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _profile = require("./profile.controller");

var router = (0, _express.Router)();
router.post('/', _profile.createOrUpdateProfile);
var _default = router;
exports.default = _default;