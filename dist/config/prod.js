"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = config = {
  mongoURI: process.env.MONGO_URI,
  jwt: process.env.JWT_SECRET,
  jwtExp: '5d'
};

exports.default = _default;