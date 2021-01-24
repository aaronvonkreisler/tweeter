import { Message } from './messages.model';
import { Chat } from '../chat/chat.model';
import { Notification } from '../../notifications/notification.model';
import { uploadImageToS3 } from '../../../services/imageUpload';
import { resizeImage } from '../../../utils/images';
// eslint-disable-next-line no-undef
const socketHandler = require('../../../handlers/socketHandler');

export const sendMessageWithFile = async (req, res) => {
   const { content, chatId } = req.body;
   const { files } = req;
   const sender = req.user.id;
   let message = undefined;

   if (!files) {
      return res.status(400).json({ msg: 'This route requires a file' });
   }

   try {
      const resizedImage = await resizeImage(300, null, files.image.data);

      const image = await uploadImageToS3(resizedImage);

      message = new Message({
         sender,
         chat: chatId,
         content,
         image: image.Location,
      });

      await message.save();

      const populatedMessage = await message
         .populate({ path: 'sender', select: 'name avatar' })
         .execPopulate();

      const chat = await Chat.findById(chatId);

      chat.users.forEach((user) => {
         const userId = user.toString();
         if (userId === sender) {
            return;
         }

         socketHandler.sendSocketMessage(req, populatedMessage, userId);
      });

      res.json(populatedMessage);
   } catch (err) {
      console.error(err.message);

      if (err.message === 'Input buffer contains unsupported image format') {
         res.status(400).json({ msg: 'Unsupported image format' });
      }

      res.status(500).send('Server Error');
   }
};

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

      const chat = await Chat.findByIdAndUpdate(chatId, {
         lastMessage: message,
      });

      chat.users.forEach((user) => {
         const userId = user.toString();
         if (userId === sender) {
            return;
         }

         socketHandler.sendSocketMessage(req, populatedMessage, userId);
         Notification.insertNotification(userId, sender, 'message', chatId);
      });

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
