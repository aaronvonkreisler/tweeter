import { validationResult } from 'express-validator';
import { Tweet } from './tweet.model';
import { User } from '../user/user.model';

// TODO - Fetch all tweets from a users following

export const createTweet = async (req, res) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const user = await User.findById(req.user.id).lean().exec();
      console.log(user);
      const newTweet = await Tweet.create({
         user: req.user.id,
         content: req.body.content,
         display_name: user.name,
         avatar: user.avatar,
         screen_name: user.screen_name,
         verified: user.verified,
      });

      res.json(newTweet);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};
