import { Router } from 'express';
import { sendMessage, getMessagesForChatRoom } from './messages.controller';

const router = Router();

// @route            POST api/messages/
// @description      Send a new Message
router.post('/', sendMessage);

// @route            GET api/messages/:chatId
// @description     Get messages for a specific chat
router.get('/:chatId', getMessagesForChatRoom);
export default router;
