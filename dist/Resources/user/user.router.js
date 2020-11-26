"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var router = (0, _express.Router)();
router.get('/', function (req, res) {
  try {
    res.send('User Route!!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
var _default = router;
exports.default = _default;