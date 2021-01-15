import { Message } from './messages.model';

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

      res.json(message);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};
