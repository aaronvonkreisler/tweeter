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
   favorites_count: {
      type: Number,
      default: 0,
   },
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
   replies_count: {
      type: Number,
      default: 0,
   },
   retweet: {
      originalTweetId: {
         type: mongoose.Schema.Types.ObjectId,
      },
      original_display_name: String,
      original_screen_name: String,
      original_avatar: String,
      original_content: String,
      original_verified: Boolean,
      original_timestamp: Date,
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

export const Tweet = mongoose.model('tweet', TweetSchema);
