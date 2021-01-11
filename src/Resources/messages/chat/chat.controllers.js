import { Chat } from './chat.model';
import { User } from '../../user/user.model';

export const createNewChat = async (req, res) => {
   const { users } = req.body;
   const requestingUserId = req.user.id;

   if (!users) {
      console.log('Users array not sent with request');
      return res.status(400).json({ msg: 'Users are required ' });
   }
   if (users.length === 0) {
      console.log('Users array is empty');
      res.status(400).json({ msg: 'Users array is empty' });
   }
   try {
      users.push(requestingUserId);
      const newChat = await Chat.create({
         users,
         isGroupChat: true,
      });

      const populatedChat = await Chat.findById(newChat.id).populate({
         path: 'users',
         select: 'name screen_name avatar verified',
      });

      res.json(populatedChat);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};

export const getChats = async (req, res) => {
   const requestingUserId = req.user.id;

   try {
      const chats = await Chat.find({
         users: { $in: requestingUserId },
      })
         .populate({
            path: 'users',
            select: 'name avatar screen_name verified',
         })
         .lean()
         .exec();

      if (!chats) {
         res.status(404).json({ msg: 'No chats found for this user' });
      }

      res.json(chats);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};