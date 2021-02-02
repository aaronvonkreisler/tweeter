import mongoose from 'mongoose';
import { Notification } from './notification.model';

const ObjectId = mongoose.Types.ObjectId;

export const retrieveNotifications = async (req, res) => {
   const user = req.user.id;

   try {
      const notifications = await Notification.aggregate([
         { $match: { receiver: ObjectId(user) } },
         { $sort: { date: -1 } },
         {
            $lookup: {
               from: 'users',
               localField: 'sender',
               foreignField: '_id',
               as: 'sender',
            },
         },
         {
            $lookup: {
               from: 'users',
               localField: 'receiver',
               foreignField: '_id',
               as: 'receiver',
            },
         },
         {
            $lookup: {
               from: 'tweets',
               localField: 'entityId',
               foreignField: '_id',
               as: 'tweet',
            },
         },

         {
            $unwind: '$sender',
         },
         {
            $unwind: '$receiver',
         },
         {
            $unwind: '$tweet',
         },

         {
            $project: {
               read: true,
               notificationType: true,
               date: true,
               entityId: true,
               'sender.name': true,
               'sender.screen_name': true,
               'sender.avatar': true,
               'sender.verified': true,
               'sender._id': true,
               'receiver._id': true,
               'receiver.name': true,
               'receiver.screen_name': true,

               tweet: true,
            },
         },
      ]);

      res.json(notifications);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};
