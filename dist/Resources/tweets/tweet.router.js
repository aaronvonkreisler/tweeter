"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _tweet = require("./tweet.controllers");

var _tweet2 = require("./tweet.getControllers");

var router = (0, _express.Router)(); // @route            POST api/tweets/
// @description      Post a tweet

router.post('/', [(0, _expressValidator.check)('content', 'Please enter some text').not().isEmpty()], _tweet.createTweet); // @route            POST api/tweets/comment/:tweet_id
// @description      Reply to a tweet

router.post('/comment/:tweet_id', [(0, _expressValidator.check)('content', 'Please insert some text to send a reply').not().isEmpty()], _tweet.replytoTweet); // @route            POST api/tweets/retweet/:tweet_id
// @description      Post a retweet

router.post('/:id/retweet', _tweet.retweet); // @route            PUT api/tweets/like/:id
// @description      Like a tweet

router.put('/like/:id', _tweet.favoriteTweet); // @route            PUT api/tweets/unlike/:id
// @description      Remove like from a tweet

router.put('/unlike/:id', _tweet.removeFavorite); // @route            DELETE api/tweets/:id
// @description      Delete a tweet

router.delete('/:id', _tweet.deleteTweet); // @route            DELETE api/tweets/comment/:tweet_id/:reply_id
// @description      Delete a reply to a tweet

router.delete('/comment/:tweet_id/:reply_id', _tweet.deleteReply); // @route            GET api/tweets/:id
// @description     Get a tweet by id

router.get('/:id', _tweet2.getTweetById); // @route            GET api/tweets
// @description     Get tweets for a users timeline

router.get('/', _tweet2.getTimelineTweets); // @route            GET api/tweets/user/:id
// @description     Get tweets for one user

router.get('/user/:id', _tweet2.getUsersTweets); // @route            GET api/tweets/user/:id/replies
// @description     Get replies for one user

router.get('/user/:id/replies', _tweet2.getUsersReplies); // @route            GET api/tweets/:tweet_id/liked
// @description     Get the users who liked a tweet

router.get('/:tweet_id/likes', _tweet2.getTweetsLikedUsers); // @route            GET api/tweets/:tweet_id/retweets
// @description     Get the users who retweeted a tweet

router.get('/:tweet_id/retweets', _tweet2.getTweetsRetweetUsers);
var _default = router;
exports.default = _default;