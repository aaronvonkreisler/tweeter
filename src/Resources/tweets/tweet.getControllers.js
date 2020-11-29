import { validationResult } from 'express-validator';
import { Tweet } from './tweet.model';
import { User } from '../user/user.model';

// TODO - Fetch all tweets from a users following
// TODO - Retweet

const getTimelineTweets = async (req, res) => {
   try {
      const user = await User.findById(req.user.id).lean().exec();
   } catch (err) {}
};
