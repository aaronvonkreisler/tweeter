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

BookmarkSchema.pre('findOneAndDelete', async function (next) {
   try {
      mongoose.model('tweet').updateMany(
         { bookmarkedBy: { $in: [this.user] } },
         {
            $pull: { bookmarkedBy: this.user },
         }
      );
   } catch (err) {
      next(err);
   }
});

export const Bookmark = mongoose.model('bookmark', BookmarkSchema);
