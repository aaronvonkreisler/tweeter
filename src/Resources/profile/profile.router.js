import { Router } from 'express';
import {
   getCurrentUsersProfile,
   uploadUserBackgroundPic,
} from './profile.controller';
const router = Router();

router.get('/', getCurrentUsersProfile);

// @route            PUT api/profile/background
// @description      Update background Picture
router.put('/background', uploadUserBackgroundPic);

export default router;
