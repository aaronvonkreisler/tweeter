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

router.post('/', [(0, _expressValidator.check)('content', 'Please enter some text').not().isEmpty()], _tweet.createTweet); // @route            POST api/tweets/user/:user_id/retweet/:tweet_id
// @description      Post a retweet

router.post('/user/:user_id/retweet/:tweet_id', _tweet.retweet); // @route            PUT api/tweets/like/:id
// @description      Like a tweet

router.put('/like/:id', _tweet.favoriteTweet); // @route            PUT api/tweets/unlike/:id
// @description      Remove like from a tweet

router.put('/unlike/:id', _tweet.removeFavorite); // @route            DELETE api/tweets/:id
// @description      Delete a tweet

router.delete('/:id', _tweet.deleteTweet); // @route            POST api/tweets/comment/:tweet_id
// @description      Delete a tweet

router.post('/comment/:tweet_id', _tweet.replytoTweet);
var _default = router;
exports.default = _default;