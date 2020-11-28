"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = require("./user.controllers");

var router = (0, _express.Router)(); // @route            GET api/user/current
// @description      Fetch the current user from database

router.get('/current', _user.fetchCurrentUser);
var _default = router;
exports.default = _default;