import { Router } from 'express';
import {
   createOrUpdateProfile,
   getCurrentUsersProfile,
} from './profile.controller';
const router = Router();

router.post('/', createOrUpdateProfile);
router.get('/', getCurrentUsersProfile);
export default router;
