import mongoose from 'mongoose';

import { Tweet } from './tweet.model';
import { User } from '../user/user.model';
const ObjectId = mongoose.Types.ObjectId;

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

export const getTweetsReplies = async (req, res) => {
   const tweetId = req.params.id;

   try {
      const replies = await Tweet.find({ in_reply_to: tweetId }).lean().exec();

      if (!replies) {
         res.status(404).json({ msg: 'No Replies for this tweet' });
      }

      res.json(replies);
   } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
         return res.status(404).json({ msg: 'No Tweets found!' });
      }
      res.status(500).send('Server Error');
   }
};

export const getUsersProfileTweets = async (req, res) => {
   try {
      const userId = req.params.id;

      const profileTweets = await Tweet.find({
         user: userId,
         in_reply_to: { $exists: false },
         retweetData: { $exists: false },
      })
         .sort({ created_at: -1 })
         .lean()
         .exec();

      if (!profileTweets) {
         res.status(404).json({ msg: 'No tweets found for this user' });
      }

      res.json(profileTweets);
   } catch (err) {
      if (err.kind === 'ObjectId') {
         return res.status(404).json({ msg: 'No Tweets found!' });
      }
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};

export const getUsersReplies = async (req, res) => {
   try {
      const userId = req.params.id;
      const replies = await Tweet.find({
         user: userId,
         in_reply_to: { $exists: true },
      })
         .sort({ created_at: -1 })
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

export const getUsersLikedTweets = async (req, res) => {
   try {
      const userId = req.params.id;

      const likedTweets = await Tweet.find({
         'favorites.user': { $in: userId },
      })
         .sort({ created_at: -1 })
         .lean()
         .exec();

      if (!likedTweets) {
         res.status(404).json({ msg: 'No liked tweets' });
      }

      res.json(likedTweets);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
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

export const getPaginatedTimelineTweets = async (req, res) => {
   const { offset } = req.params;
   try {
      const user = await User.findById(req.user.id).lean().exec();
      const following = user.following.map((follow) => follow.user);

      const unwantedUserFields = [
         'user.password',
         'user.email',
         'user.retweets',
         'user.backgroundPicture',
         'user.pinnedTweet',
         'user.following',
         'user.followers',
         'user.bio',
         'user.location',
         'user.website',
         'user.createdAt',
         'user.__v',
      ];

      const tweets = await Tweet.aggregate([
         {
            $match: {
               in_reply_to: { $exists: false },
               $or: [
                  { user: { $in: following } },
                  { user: ObjectId(user._id) },
               ],
            },
         },
         { $sort: { createdAt: -1 } },
         { $skip: Number(offset) },
         { $limit: 10 },
         {
            $lookup: {
               from: 'users',
               localField: 'user',
               foreignField: '_id',
               as: 'user',
            },
         },
         {
            $unwind: '$user',
         },
         { $unset: [...unwantedUserFields] },
      ]);

      res.json(tweets);
   } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
         return res.status(404).json({ msg: 'No Tweets found!' });
      }
      res.status(500).send('Server Error');
   }
};
