import { Router } from 'express';
import { fetchCurrentUser, followUser, unfollowUser } from './user.controllers';

const router = Router();

// @route            GET api/user/current
// @description      Fetch the current user from database
router.get('/current', fetchCurrentUser);

// @route            PUT api/user/follow/:id
// @description      Follow a user by id
router.put('/follow/:id', followUser);

// @route            PUT api/user/unfollow/:id
// @description      Unfollow a user by id
router.put('/unfollow/:id', unfollowUser);
export default router;
