import { Router } from 'express';
import { createOrUpdateProfile } from './profile.controller';
const router = Router();

router.post('/', createOrUpdateProfile);

export default router;
