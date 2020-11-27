import mongoose from 'mongoose';

const TweetSchema = new mongoose.Schema({
   user: {
      type: mongoose.SchemaType.ObjectId,
      ref: 'users',
   },
   createdAt: {
      type: Date,
      required: true,
   },
   text: String,
   content: {
      type: Object,
      //required: true,
   },
});

export const Tweet = mongoose.model('tweet', TweetSchema);
