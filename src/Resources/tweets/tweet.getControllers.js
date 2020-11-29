import { validationResult } from 'express-validator';
import { Tweet } from './tweet.model';
import { User } from '../user/user.model';

// TODO - Fetch all tweets from a users following
// TODO - If Tweet has a retweet - the tweet needs to be populated

export const getTweetById = async (req, res) => {
   try {
      const tweet = await Tweet.findById(req.params.id)
         .populate('retweet')
         .exec();
      if (!tweet) {
         res.status(404).json({ msg: 'Tweet not found' });
      }
      res.json(tweet);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};
