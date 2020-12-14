import mongoose from 'mongoose';

const TweetSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
   },
   content: {
      type: String,
   },
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
   favorites_count: {
      type: Number,
      default: 0,
   },
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
   replies_count: {
      type: Number,
      default: 0,
   },
   retweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tweet',
   },
   retweet_count: {
      type: Number,
      default: 0,
   },

   created_at: {
      type: Date,
      default: Date.now,
   },
});

TweetSchema.pre('find', async function () {
   this.populate({
      path: 'user',
      select: 'avatar verified name email screen_name',
   });
});

TweetSchema.post('remove', async function (doc, next) {
   await Tweet.updateMany({ retweet: doc._id }, { retweet: null });
});

export const Tweet = mongoose.model('tweet', TweetSchema);
