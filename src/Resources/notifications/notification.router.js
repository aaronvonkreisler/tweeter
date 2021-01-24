import { Router } from 'express';
import { retrieveNotifications } from './notification.controller';
const router = Router();

// @route            GET api/notifications/
// @description      Get a users notifications

router.get('/', retrieveNotifications);
export default router;
