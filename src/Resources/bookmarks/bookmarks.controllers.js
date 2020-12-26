import { Tweet } from '../tweets/tweet.model';

import { Bookmark } from './bookmarks.model';

export const getAllBookmarks = async (req, res) => {
   const userId = req.user.id;

   try {
      const bookmarks = await Bookmark.findOne({ user: userId }).populate(
         'tweets'
      );

      if (!bookmarks) {
         res.status(404).json({ msg: 'No Bookmarks for this user' });
      }

      res.json(bookmarks);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};

export const addTweetToBookmarks = async (req, res) => {
   const userId = req.user.id;
   const tweetId = req.params.id;
   try {
      const tweet = await Tweet.findByIdAndUpdate(tweetId, {
         $addToSet: { bookmarkedBy: userId },
      }).exec();

      if (!tweet) {
         res.status(404).json({ msg: 'No Tweet found by that ID' });
      }
      const bookmarks = await Bookmark.findOneAndUpdate(
         { user: userId },
         {
            user: userId,
            $addToSet: { tweets: tweet._id },
         },
         { new: true, upsert: true }
      )
         .lean()
         .exec();

      res.json(bookmarks);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};

export const removeTweetFromBookmarks = async (req, res) => {
   const userId = req.user.id;
   const tweetId = req.params.id;

   try {
      const tweet = await Tweet.findByIdAndUpdate(tweetId, {
         $pull: { bookmarkedBy: userId },
      })
         .lean()
         .exec();

      if (!tweet) {
         res.status(400).send('Tweet no longer exists');
      }

      const bookmarks = await Bookmark.findOneAndUpdate(
         { user: userId },
         { $pull: { tweets: tweetId } },
         { new: true }
      )
         .lean()
         .exec();

      res.json(bookmarks);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};
