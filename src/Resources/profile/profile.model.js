import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
   },
   profile_picture: String,
   background_picture: String,
});

export const Profile = mongoose.model('profile', ProfileSchema);
