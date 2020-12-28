import mongoose from 'mongoose';
import { Tweet } from '../tweets/tweet.model';
const ObjectId = mongoose.Types.ObjectId;
const BookmarkSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
   },
   tweets: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'tweet',
      },
   ],
});

export const Bookmark = mongoose.model('bookmark', BookmarkSchema);
