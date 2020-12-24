import mongoose from 'mongoose';

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
