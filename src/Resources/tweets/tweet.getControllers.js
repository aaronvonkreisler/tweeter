import { validationResult } from 'express-validator';
import { Tweet } from './tweet.model';
import { User } from '../user/user.model';

// TODO - Fetch all tweets from a users following
// TODO - If Tweet has a retweet - the tweet needs to be populated

export const getTweetById = async (req, res) => {
   try {
      const tweet = await Tweet.findById(req.params.id)
         .populate('retweet')
         .populate({
            path: 'user',
            select: 'avatar verified name email screen_name',
         })
         .populate({
            path: 'replies',
            populate: { path: 'tweet' },
         })
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

// fetch the most recent tweets from the currently logged in users following.
// TODO -- pagination
export const getTimelineTweets = async (req, res) => {
   try {
      const user = await User.findById(req.user.id).lean().exec();
      const userIds = user.following.map((follow) => follow.user);
      userIds.push(req.user.id);
      // Exclude tweets that are replies to other tweets
      const tweets = await Tweet.find({
         user: userIds,
         in_reply_to: { $exists: false },
      })
         .populate('retweetData')
         .sort({ created_at: -1 })
         .exec();

      if (!tweets) {
         return res.status(404).json({ msg: 'No Tweets found!' });
      }

      res.json(tweets);
   } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
         return res.status(404).json({ msg: 'No Tweets found!' });
      }
      res.status(500).send('Server Error');
   }
};

export const getUsersTweets = async (req, res) => {
   try {
      const tweets = await Tweet.find({ user: req.params.id }).lean().exec();
      if (!tweets) {
         res.status(404).json({ msg: 'No tweets found for this user!' });
      }
      res.json(tweets);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

export const getUsersReplies = async (req, res) => {
   try {
      const replies = await Tweet.find({ 'replies.user': req.params.id })
         .lean()
         .exec();
      if (!replies) {
         res.status(404).json({ msg: 'No replies yet' });
      }
      res.json(replies);
   } catch (err) {
      console.error(err.message);
      res.statu(500).send('Server Error');
   }
};

export const getTweetsLikedUsers = async (req, res) => {
   try {
      const tweet = await Tweet.findById(req.params.tweet_id)
         .populate({
            path: 'favorites',
            populate: {
               path: 'user',
               select: '_id display_name screen_name name verified avatar',
            },
         })
         .select('-_id')
         .lean()
         .exec();
      if (!tweet) {
         res.status(404).json({ msg: 'Tweet not found' });
      }

      res.json(tweet.favorites);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

export const getTweetsRetweetUsers = async (req, res) => {
   try {
      const tweet = await Tweet.find({ retweet: req.params.tweet_id })
         .populate({
            path: 'user',
            select: '_id display_name screen_name name verified avatar',
         })
         .select('user -_id')
         .lean()
         .exec();

      if (!tweet) {
         res.status(400).json({ msg: 'Tweet has not been retweeted' });
      }

      res.json(tweet);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};
