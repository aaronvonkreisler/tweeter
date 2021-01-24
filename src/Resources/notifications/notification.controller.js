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
            $unwind: '$sender',
         },
         {
            $unwind: '$receiver',
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
               'sender._id': true,
               'receiver._id': true,
            },
         },
      ]);

      res.json(notifications);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};
