"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _tweet = require("./tweet.controllers");

var router = (0, _express.Router)(); // @route            POST api/tweets/
// @description      Post a tweet

router.post('/', [(0, _expressValidator.check)('content', 'Please enter some text').not().isEmpty()], _tweet.createTweet);
var _default = router;
exports.default = _default;