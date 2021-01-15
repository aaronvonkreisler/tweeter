import { Router } from 'express';
import { sendMessage } from './messages.controller';

const router = Router();

// @route            POST api/messages/
// @description      Send a new Message
router.post('/', sendMessage);

export default router;
