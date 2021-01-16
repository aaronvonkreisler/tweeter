import { Router } from 'express';
import {
   sendMessage,
   getMessagesForChatRoom,
   sendMessageWithFile,
} from './messages.controller';

const router = Router();

// @route            POST api/messages/
// @description      Send a new Message
router.post('/', sendMessage);

// @route            POST api/messages/image
// @description      Send a new Message with an image
router.post('/image', sendMessageWithFile);

// @route            GET api/messages/:chatId
// @description     Get messages for a specific chat
router.get('/:chatId', getMessagesForChatRoom);
export default router;
