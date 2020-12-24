import { validationResult } from 'express-validator';
import { Tweet } from './tweet.model';
import { User } from '../user/user.model';
import { uploadPhoto } from '../../services/imageUpload';

export const createTweet = async (req, res) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const newTweet = await Tweet.create({
         user: req.user.id,
         content: req.body.content,
         image: req.body.image,
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

      if (tweet.in_reply_to !== null) {
         await Tweet.findByIdAndUpdate(tweet.in_reply_to, {
            $pull: { replies: { tweet: tweet._id } },
         });
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
      const tweetId = req.params.id;
      const userId = req.user.id;

      // Try and delete retweet. If delete is successfull, that means user has
      // already retweeted and is trying to remove retweet.

      const deletedTweet = await Tweet.findOneAndDelete({
         user: userId,
         retweetData: tweetId,
      });

      // if (!deletedTweet) {
      //    res.sendStatus(400);
      // }

      const option = deletedTweet !== null ? '$pull' : '$addToSet';

      let retweet = deletedTweet;

      if (retweet === null) {
         retweet = await Tweet.create({
            user: userId,
            retweetData: tweetId,
         });
      }

      // Insert retweet to user Schema

      const user = await User.findByIdAndUpdate(
         userId,
         { [option]: { retweets: retweet._id } },
         { new: true }
      );

      //Add user to tweets retweet users

      const tweet = await Tweet.findByIdAndUpdate(
         tweetId,
         { [option]: { retweetUsers: userId } },
         { new: true }
      ).populate({ path: 'user', select: 'avatar screen_name verified name ' });

      res.json(tweet);
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
      const reply = await Tweet.create({
         user: req.user.id,
         content: req.body.content,
         in_reply_to: req.params.tweet_id,
      });

      await Tweet.findByIdAndUpdate(req.params.tweet_id, {
         $push: { replies: { user: req.user.id, tweet: reply._id } },
         $inc: { replies_count: 1 },
      });

      // find the reply tweet and populate the user to send back

      const tweetToSend = await Tweet.findById(reply._id).populate({
         path: 'user',
         select: 'avatar verified name screen_name',
      });

      res.json(tweetToSend);
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

export const pinTweetToProfile = async (req, res) => {
   const tweetId = req.params.id;
   const userId = req.user.id;

   try {
      const tweetToPin = await Tweet.findById(tweetId).populate({
         path: 'user',
         select: 'name screen_name avatar verified',
      });

      if (!tweetToPin) {
         res.status(404).json({ msg: 'No Tweet found by this ID' });
      }

      const user = await User.findByIdAndUpdate(
         userId,
         { pinnedTweet: tweetToPin._id },
         { new: true, select: '-password -email' }
      );

      res.json(tweetToPin);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};

export const removePinnedTweet = async (req, res) => {
   const userId = req.user.id;

   try {
      await User.findByIdAndUpdate(userId, { $unset: { pinnedTweet: '' } });

      res.json({ msg: 'Pinned Tweet Removed' });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};

export const uploadImageForTweet = async (req, res) => {
   try {
      const { files } = req;
      const regex = /(image\/jpg)|(image\/jpeg)|(image\/png)/i;
      if (!files.image.mimetype.match(regex)) {
         res.status(422).json({
            msg: 'Invalid file type. Please upload a JPG or PNG filetype.',
         });
      } else {
         const imageResponse = await uploadPhoto(files);

         res.json(imageResponse.Location);
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};
