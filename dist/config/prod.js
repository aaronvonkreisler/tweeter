"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = config = {
  mongoURI: process.env.MONGO_URI,
  jwt: process.env.JWT_SECRET,
  jwtExp: '5d',
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

exports.default = _default;