import { Router } from 'express';
import { check } from 'express-validator';
import { createTweet } from './tweet.controllers';
const router = Router();

// @route            POST api/tweets/
// @description      Post a tweet
router.post(
   '/',
   [check('content', 'Please enter some text').not().isEmpty()],
   createTweet
);

export default router;
