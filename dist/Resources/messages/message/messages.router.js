"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _messages = require("./messages.controller");

var router = (0, _express.Router)(); // @route            POST api/messages/
// @description      Send a new Message

router.post('/', _messages.sendMessage); // @route            GET api/messages/:chatId
// @description     Get messages for a specific chat

router.get('/:chatId', _messages.getMessagesForChatRoom);
var _default = router;
exports.default = _default;