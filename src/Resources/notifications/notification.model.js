import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NotificationShema = new Schema({
   receiver: {
      type: Schema.Types.ObjectId,
      ref: 'user',
   },
   sender: {
      type: Schema.Types.ObjectId,
      ref: 'user',
   },
   notificationType: {
      type: String,
      enum: ['follow', 'like', 'reply', 'mention', 'retweet', 'message'],
   },
   entityId: Schema.Types.ObjectId,
   date: {
      type: Date,
      default: Date.now,
   },
   read: {
      type: Boolean,
      default: false,
   },
});

NotificationShema.statics.insertNotification = async (
   receiver,
   sender,
   notificationType,
   entityId
) => {
   const data = {
      sender,
      receiver,
      notificationType,
      entityId,
   };
   await Notification.deleteOne(data).catch((err) => console.log(err));

   return Notification.create(data).catch((err) => console.log(err));
};

export const Notification = mongoose.model('notification', NotificationShema);
