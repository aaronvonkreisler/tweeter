import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NotificationShema = new Schema({
   receiver: {
      type: Schema.ObjectId,
      ref: 'user',
   },
   sender: {
      type: Schema.ObjectId,
      ref: 'user',
   },
   notificationType: {
      type: String,
      enum: ['follow', 'like', 'comment', 'mention'],
   },
   notificationData: Object,
   date: {
      type: Date,
      default: Date.now,
   },
   read: {
      type: Boolean,
      default: false,
   },
});

export const Notification = mongoose.model('notification', NotificationShema);
