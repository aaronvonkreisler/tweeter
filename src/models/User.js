const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   userName: {
      type: String,
      required: true,
      unique: true,
   },
   displayName: {
      type: String,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   dateOfBirth: {
      type: Date,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

export const User = mongoose.model('user', UserSchema);
