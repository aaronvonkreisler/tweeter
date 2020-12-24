"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _bookmarks = require("./bookmarks.controllers");

var router = (0, _express.Router)(); // @route            GET api/bookmarks
// @description     Get all the tweets in a users bookmarks

router.get('/', _bookmarks.getAllBookmarks); // @route            POST api/bookmarks/:id
// @description      Post a tweet to a users bookmarks

router.post('/:id', _bookmarks.addTweetToBookmarks); // @route            PUT api/bookmarks/:id
// @description     Remove a tweet to a users bookmarks

router.put('/:id', _bookmarks.removeTweetFromBookmarks);
var _default = router;
exports.default = _default;