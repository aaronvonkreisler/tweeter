"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _chat = require("./chat.controllers");

var router = (0, _express.Router)(); // @route            POST api/chats/
// @description      Start a new chat

router.post('/', _chat.createNewChat); // @route            GET api/chats/
// @description     Get a users chats

router.get('/', _chat.getChats);
var _default = router;
exports.default = _default;