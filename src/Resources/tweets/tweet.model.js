import mongoose from 'mongoose';

const TweetSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
   },
   content: {
      type: String,
   },
   image: String,
   in_reply_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tweet',
   },
   favorites: [
      {
         user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
         },
      },
   ],

   replies: [
      {
         user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
         },
         tweet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tweet',
         },
         date: {
            type: Date,
            default: Date.now,
         },
      },
   ],

   retweetUsers: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user',
      },
   ],
   retweetData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tweet',
   },

   pinned: Boolean,
   created_at: {
      type: Date,
      default: Date.now,
   },
});

TweetSchema.pre('find', async function () {
   this.populate({
      path: 'user',
      select: 'avatar verified name screen_name',
   });
});

TweetSchema.pre('remove', async function (doc, next) {
   // TODO -- remove tweet reference from bookmark model
   const tweet = this;
   try {
      await Tweet.deleteMany({ retweetData: tweet._id });
   } catch (err) {
      next(err);
   }
});

export const Tweet = mongoose.model('tweet', TweetSchema);
