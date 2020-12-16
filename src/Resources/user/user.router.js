import { Router } from 'express';
import {
   fetchCurrentUser,
   fetchUserByUsername,
   followUser,
   unfollowUser,
   uploadUserAvatar,
} from './user.controllers';

const router = Router();

// @route            GET api/user/current
// @description      Fetch the current user from database
router.get('/current', fetchCurrentUser);

// @route            GET api/user/:username
// @description      Fetch the current user from database
router.get('/:username', fetchUserByUsername);

// @route            PUT api/user/follow/:id
// @description      Follow a user by id
router.put('/follow/:id', followUser);

// @route            PUT api/user/unfollow/:id
// @description      Unfollow a user by id
router.put('/unfollow/:id', unfollowUser);

// @route            PUT api/user/avatar
// @description      Update profile picture

router.put('/avatar', uploadUserAvatar);

export default router;
