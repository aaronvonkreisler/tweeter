import { Message } from './messages.model';
import { Chat } from '../chat/chat.model';
import { uploadBufferPhoto } from '../../../services/imageUpload';
import sharp from 'sharp';

export const sendMessageWithFile = async (req, res) => {
   const { content, chatId } = req.body;
   const { files } = req;
   const sender = req.user.id;
   let message = undefined;

   if (!files) {
      return res.status(400).json({ msg: 'This route requires a file' });
   }

   try {
      const resizedBuffer = await sharp(files.image.data)
         .resize(300, null)
         .webp()
         .toBuffer();

      const image = await uploadBufferPhoto(resizedBuffer);

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

      await Chat.findByIdAndUpdate(chatId, { lastMessage: message });

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
