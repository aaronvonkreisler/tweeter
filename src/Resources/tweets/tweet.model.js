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
            ref: 'users',
         },
      },
   ],
   favorites_count: Number,
   replies: [
      {
         user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
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
   replies_count: Number,
   retweet: {
      originalTweetId: {
         type: mongoose.Schema.Types.ObjectId,
      },
   },
   retweet_count: Number,
   entities: {
      hashtags: [String],
      user_mentions: [String],
   },
   created_at: {
      type: Date,
      default: Date.now,
   },
});

export const Tweet = mongoose.model('tweet', TweetSchema);
