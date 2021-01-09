import { Router } from 'express';
import { createNewChat, getChats } from './chat.controllers';
const router = Router();

// @route            POST api/chats/
// @description      Start a new chat
router.post('/', createNewChat);

// @route            GET api/chats/
// @description     Get a users chats
router.get('/', getChats);
export default router;
