import { Router } from 'express';
import { check } from 'express-validator';
import {
   createTweet,
   replytoTweet,
   deleteTweet,
   favoriteTweet,
   removeFavorite,
   retweet,
   pinTweetToProfile,
   removePinnedTweet,
   uploadImageForTweet,
} from './tweet.controllers';
import {
   getTweetById,
   getTimelineTweets,
   getUsersProfileTweets,
   getUsersReplies,
   getTweetsLikedUsers,
   getTweetsRetweetUsers,
   getUsersLikedTweets,
   getTweetsReplies,
} from './tweet.getControllers';
const router = Router();

// @route            POST api/tweets/
// @description      Post a tweet
router.post(
   '/',
   [check('content', 'Please enter some text').not().isEmpty()],
   createTweet
);

// @route            POST api/tweets/comment/:tweet_id
// @description      Reply to a tweet
router.post(
   '/comment/:tweet_id',
   [
      check('content', 'Please insert some text to send a reply')
         .not()
         .isEmpty(),
   ],
   replytoTweet
);

// @route            POST api/tweets/retweet/:tweet_id
// @description      Post a retweet
router.post('/:id/retweet', retweet);

// @route            PUT api/tweets/like/:id
// @description      Like a tweet
router.put('/like/:id', favoriteTweet);

// @route            PUT api/tweets/unlike/:id
// @description      Remove like from a tweet
router.put('/unlike/:id', removeFavorite);

// @route            DELETE api/tweets/:id
// @description      Delete a tweet
router.delete('/:id', deleteTweet);

// @route            GET api/tweets/:id
// @description     Get a tweet by id
router.get('/:id', getTweetById);

// @route            GET api/tweets/:id/replies
// @description     Get replies for a tweet
router.get('/:id/replies', getTweetsReplies);

// @route            GET api/tweets
// @description     Get tweets for a users timeline
router.get('/', getTimelineTweets);

// @route            GET api/tweets/user/:id
// @description     Get tweets for one user
router.get('/user/:id', getUsersProfileTweets);

// @route            GET api/tweets/user/:id/replies
// @description     Get replies for one user
router.get('/user/:id/replies', getUsersReplies);

// @route            GET api/tweets/user/:id/liked
// @description     Get all liked tweets for one user
router.get('/user/:id/likes', getUsersLikedTweets);

// @route            GET api/tweets/:tweet_id/liked
// @description     Get the users who liked a tweet
router.get('/:tweet_id/likes', getTweetsLikedUsers);

// @route            GET api/tweets/:tweet_id/retweets
// @description     Get the users who retweeted a tweet
router.get('/:tweet_id/retweets', getTweetsRetweetUsers);

// @route            PUT api/tweets/pin-tweet/:id
// @description      Pin a tweet to a profile

router.put('/pin-tweet/:id', pinTweetToProfile);

// @route            PUT api/tweets/remove-pin/:id
// @description      Remove a pinned tweet

router.put('/remove-pin/', removePinnedTweet);

// @route            POST api/tweets/image
// @description      Remove a pinned tweet

router.post('/image', uploadImageForTweet);

export default router;
