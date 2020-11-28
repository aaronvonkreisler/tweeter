import { Router } from 'express';
import { fetchCurrentUser } from './user.controllers';

const router = Router();

// @route            GET api/user/current
// @description      Fetch the current user from database
router.get('/current', fetchCurrentUser);

export default router;
