import { Router } from 'express';
import { check } from 'express-validator';
import {
   createTweet,
   replytoTweet,
   deleteTweet,
   favoriteTweet,
   removeFavorite,
   retweet,
} from './tweet.controllers';
const router = Router();

// @route            POST api/tweets/
// @description      Post a tweet
router.post(
   '/',
   [check('content', 'Please enter some text').not().isEmpty()],
   createTweet
);

// @route            POST api/tweets/user/:user_id/retweet/:tweet_id
// @description      Post a retweet
router.post('/user/:user_id/retweet/:tweet_id', retweet);

// @route            PUT api/tweets/like/:id
// @description      Like a tweet
router.put('/like/:id', favoriteTweet);

// @route            PUT api/tweets/unlike/:id
// @description      Remove like from a tweet
router.put('/unlike/:id', removeFavorite);

// @route            DELETE api/tweets/:id
// @description      Delete a tweet
router.delete('/:id', deleteTweet);

// @route            POST api/tweets/comment/:tweet_id
// @description      Delete a tweet
router.post('/comment/:tweet_id', replytoTweet);

export default router;
