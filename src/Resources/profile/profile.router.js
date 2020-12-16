import { Router } from 'express';
import {
   getCurrentUsersProfile,
   getProfileByScreenName,
   uploadUserBackgroundPic,
} from './profile.controller';
const router = Router();

router.get('/', getCurrentUsersProfile);

// @route            GET api/profile/:id
// @description      Get a profile by user Id
router.get('/:screen_name', getProfileByScreenName);

// @route            PUT api/profile/background
// @description      Update background Picture
router.put('/background', uploadUserBackgroundPic);

export default router;
