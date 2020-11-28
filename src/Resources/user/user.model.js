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
   date_of_birth: {
      type: Date,
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
      default: 'http://www.avatar.com',
   },
   display_name: String,
   location: String,
   description: String,
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

export const User = mongoose.model('user', UserSchema);
