"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = require("./auth.controllers");

var _expressValidator = require("express-validator");

var router = (0, _express.Router)();
router.post('/register', [(0, _expressValidator.check)('email', 'Please include a valid email').isEmail(), (0, _expressValidator.check)('password', 'Password must be at least 6 characters').isLength({
  min: 6
}), (0, _expressValidator.check)('name', 'Please include your name').not().isEmpty(), (0, _expressValidator.check)('screen_name', 'Username must be between 3 and 15 characters').isLength({
  min: 3,
  max: 15
}), (0, _expressValidator.check)('date_of_birth', 'Please provide your date of birth').not().isEmpty()], _auth.register);
router.post('/signin', [(0, _expressValidator.check)('email', 'Please include a valid email').isEmail(), (0, _expressValidator.check)('password', 'Password is required').exists()], _auth.signIn);
var _default = router;
exports.default = _default;