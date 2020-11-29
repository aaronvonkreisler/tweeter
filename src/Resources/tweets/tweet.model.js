import mongoose from 'mongoose';

const TweetSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
   },
   display_name: String,
   screen_name: String,
   avatar: String,
   verified: Boolean,
   content: {
      type: String,
      //required: true,
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
            unique: true,
         },
         content: {
            type: String,
            required: true,
         },
         name: String,
         avatar: String,
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
   entities: {
      hashtags: [String],
      user_mentions: [String],
   },
   created_at: {
      type: Date,
      default: Date.now,
   },
});

TweetSchema.post('remove', async function (doc, next) {
   await Tweet.updateMany({ retweet: doc._id }, { retweet: null });
});

export const Tweet = mongoose.model('tweet', TweetSchema);
