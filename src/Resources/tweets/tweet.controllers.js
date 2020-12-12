import { validationResult } from 'express-validator';
import { Tweet } from './tweet.model';
import { User } from '../user/user.model';

export const createTweet = async (req, res) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const newTweet = await Tweet.create({
         user: req.user.id,
         content: req.body.content,
      });

      const tweet = await Tweet.findById(newTweet._id).populate({
         path: 'user',
         select: 'avatar name screen_name verified',
      });

      res.json(tweet);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

export const deleteTweet = async (req, res) => {
   try {
      const tweet = await Tweet.findById(req.params.id);

      if (!tweet) {
         return res.status(400).json({ msg: 'Tweet not found!' });
      }
      // Check to see if the tweet belongs to the user attempting to
      // delete it
      if (tweet.user.toString() !== req.user.id) {
         return res
            .status(401)
            .json({ msg: 'User not authorized to perform this action' });
      }
      await tweet.remove();
      res.json({ msg: 'Tweet successfully removed' });
   } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
         return res.status(404).json({ msg: 'Tweet not found!' });
      }
      res.status(500).send('Server Error');
   }
};

export const favoriteTweet = async (req, res) => {
   try {
      const tweet = await Tweet.findByIdAndUpdate(
         req.params.id,
         {
            $addToSet: { favorites: { user: req.user.id } },
            $inc: { favorites_count: 1 },
         },
         { new: true }
      ).exec();

      res.json(tweet.favorites);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

export const removeFavorite = async (req, res) => {
   try {
      const tweet = await Tweet.findByIdAndUpdate(
         req.params.id,
         {
            $pull: { favorites: { user: req.user.id } },
            $inc: { favorites_count: -1 },
         },
         { new: true }
      ).exec();

      res.json(tweet.favorites);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

export const retweet = async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password').exec();
      await Tweet.findByIdAndUpdate(req.params.tweet_id, {
         $inc: { retweet_count: 1 },
      }).exec();
      const newTweet = await Tweet.create({
         user: req.user.id,
         content: req.body.content,
         display_name: user.name,
         avatar: user.avatar,
         screen_name: user.screen_name,
         verified: user.verified,
         retweet: req.params.tweet_id,
      });

      res.json(newTweet);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

export const replytoTweet = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const reply = {
         content: req.body.content,
         user: req.user.id,
      };

      const tweet = await Tweet.findByIdAndUpdate(
         req.params.tweet_id,
         {
            $push: { replies: reply },
            $inc: { replies_count: 1 },
         },
         { new: true }
      ).populate({
         path: 'replies',
         populate: { path: 'user', select: 'avatar verified name screen_name' },
      });

      res.json(tweet.replies);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

export const deleteReply = async (req, res) => {
   try {
      const tweet = await Tweet.findById(req.params.tweet_id);

      const reply = tweet.replies.find(
         (reply) => reply.id === req.params.reply_id
      );

      if (!reply) {
         return res.status(400).json({ msg: 'Reply does not exist' });
      }

      if (reply.user.toString() !== req.user.id) {
         return res
            .status(401)
            .json({ msg: 'Not authorized to perform this action' });
      }

      const removeIndex = tweet.replies.map((reply) =>
         reply.user.toString().indexOf(req.user.id)
      );

      tweet.replies.splice(removeIndex, 1);
      await tweet.save();
      res.json(tweet.replies);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};
