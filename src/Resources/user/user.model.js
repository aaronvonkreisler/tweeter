import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   name: {
      type: String,
      required: true,
      trim: true,
   },
   screen_name: {
      type: String,
      required: true,
      maxlength: 15,
      unique: true,
      trim: true,
   },
   avatar: {
      type: String,
      default:
         'https://tweeter-dev.s3.us-east-2.amazonaws.com/Profile_avatar_placeholder_large.png',
   },
   display_name: String,

   protected: {
      type: Boolean,
      default: false,
   },
   followers_count: Number,
   following_count: Number,
   statuses_count: Number,
   default_profile: {
      type: Boolean,
      default: true,
   },
   verified: {
      type: Boolean,
      default: false,
   },
   following: [
      {
         user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
         },
      },
   ],
   followers: [
      {
         user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
         },
      },
   ],
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

UserSchema.pre('save', function (next) {
   if (!this.isModified('password')) {
      return next();
   }

   bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) {
         return next(err);
      }
      this.password = hash;
      next();
   });
});

// UserSchema.post('remove',async function (doc, next) {
//    await User.updateMany({ following: doc._id }, { retweet: null });
// })

export const User = mongoose.model('user', UserSchema);
