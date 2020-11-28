import { validationResult } from 'express-validator';
import { Tweet } from './tweet.model';
import { User } from '../user/user.model';

// TODO - Fetch all tweets from a users following
// TODO - Retweet

export const createTweet = async (req, res) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const user = await User.findById(req.user.id).lean().exec();
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
      const tweet = await Tweet.findById(req.params.id);
      if (
         tweet.favorites.filter(
            (favorite) => favorite.user.toString() === req.user.id
         ).length > 0
      ) {
         return res.status(400).json({ msg: 'Tweet already liked' });
      }

      tweet.favorites.unshift({ user: req.user.id });
      tweet.favorites_count += 1;
      await tweet.save();
      res.json(tweet.favorites);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

export const removeFavorite = async (req, res) => {
   try {
      const tweet = await Tweet.findById(req.params.id);
      if (
         tweet.favorites.filter(
            (favorite) => favorite.user.toString() === req.user.id
         ).length === 0
      ) {
         return res.status(400).json({ msg: 'Tweet not yet liked' });
      }

      const removeIndex = tweet.favorites.map((favorite) =>
         favorite.user.toString().indexOf(req.user.id)
      );
      tweet.favorites.splice(removeIndex, 1);
      tweet.favorites_count -= 1;
      await tweet.save();

      res.json(tweet.favorites);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

export const retweet = async (req, res) => {
   //POST api/tweets/user/:user_id/retweet/:tweet_id
   try {
      const user = await User.findById(req.user.id);
      const retweetUser = await User.findById(req.params.user_id);
      const retweet = await Tweet.findById(req.params.tweet_id);

      const newTweet = await Tweet.create({
         user: req.user.id,
         content: req.body.content,
         display_name: user.name,
         avatar: user.avatar,
         screen_name: user.screen_name,
         verified: user.verified,
         retweet: {
            originalTweetId: req.params.tweet_id,
            original_display_name: retweetUser.display_name,
            original_screen_name: retweetUser.screen_name,
            original_avatar: retweetUser.avatar,
            original_content: retweet.content,
            original_verified: retweetUser.verified,
            original_timestamp: retweet.created_at,
         },
      });

      retweet.retweet_count += 1;
      await retweet.save();

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
      const user = await User.findById(req.user.id).select('-password');
      const tweet = await Tweet.findById(req.params.tweet_id);
      const reply = {
         user: req.user.id,
         content: req.body.content,
         display_name: user.name,
         avatar: user.avatar,
         screen_name: user.screen_name,
         verified: user.verified,
      };

      tweet.replies.push(reply);
      tweet.replies_count += 1;
      await tweet.save();
      res.json(tweet.replies);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

export const deleteReply = async();
