import { Router } from 'express';
import { createNewChat, getChats, getChatByUserId } from './chat.controllers';
const router = Router();

// @route            POST api/chats/
// @description      Start a new chat
router.post('/', createNewChat);

// @route            GET api/chats/
// @description     Get a users chats
router.get('/', getChats);

// @route            GET api/chats/user/:id
// @description     Get a chat for a user and create if non existent
router.get('/user/:id', getChatByUserId);
export default router;
