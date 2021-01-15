import { Message } from './messages.model';
import { Chat } from '../chat/chat.model';

export const sendMessage = async (req, res) => {
   const { chatId, content, image } = req.body;
   const sender = req.user.id;

   if (!chatId) {
      console.log('No Chat ID in request');
      res.status(400).json({ msg: 'Chat ID must be present in request' });
   }

   try {
      const message = await Message.create({
         sender,
         content,
         image,
         chat: chatId,
      });

      const populatedMessage = await message
         .populate({ path: 'sender', select: 'name avatar' })
         .execPopulate();

      await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

      res.json(populatedMessage);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};

export const getMessagesForChatRoom = async (req, res) => {
   const chatId = req.params.chatId;

   try {
      const messages = await Message.find({ chat: chatId })
         .populate({
            path: 'sender',
            select: 'name avatar',
         })
         .lean()
         .exec();

      if (!messages) {
         res.status(400).json({ msg: 'No messages found' });
      }
      res.json(messages);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};
