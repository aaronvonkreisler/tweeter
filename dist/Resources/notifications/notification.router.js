"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _notification = require("./notification.controller");

var router = (0, _express.Router)(); // @route            GET api/notifications/
// @description      Get a users notifications

router.get('/', _notification.retrieveNotifications);
var _default = router;
exports.default = _default;