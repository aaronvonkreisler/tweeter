import { Router } from 'express';
import {
   getCurrentUsersProfile,
   getProfileByScreenName,
} from './profile.controller';
const router = Router();

router.get('/', getCurrentUsersProfile);

// @route            GET api/profile/:id
// @description      Get a profile by user Id
router.get('/:screen_name', getProfileByScreenName);

export default router;
