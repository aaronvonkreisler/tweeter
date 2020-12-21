import { Router } from 'express';
import {
   fetchCurrentUser,
   fetchUserByUsername,
   fetchUsersFollowers,
   fetchUsersFollowing,
   followUser,
   unfollowUser,
   uploadUserAvatar,
   uploadUserBackgroundImage,
   getPinnedTweet,
} from './user.controllers';

const router = Router();

// @route            GET api/user/current
// @description      Fetch the current user from database
router.get('/current', fetchCurrentUser);

// @route            GET api/user/:username
// @description      Fetch the current user from database
router.get('/:username', fetchUserByUsername);

// @route            GET api/user/:id/followers
// @description      Get a users followers - each follower will be populated
router.get('/:username/followers', fetchUsersFollowers);

// @route            GET api/user/:id/following
// @description      Get a users following - each follower will be populated
router.get('/:username/following', fetchUsersFollowing);

// @route            PUT api/user/follow/:id
// @description      Follow a user by id
router.put('/follow/:id', followUser);

// @route            PUT api/user/unfollow/:id
// @description      Unfollow a user by id
router.put('/unfollow/:id', unfollowUser);

// @route            PUT api/user/avatar
// @description      Update profile picture

router.put('/avatar', uploadUserAvatar);

// @route            PUT api/user/background
// @description      Update background picture

router.put('/background', uploadUserBackgroundImage);

// @route            GET api/user/:username/pinned
// @description      Get a users pinned tweet
router.get('/:username/pinned', getPinnedTweet);

export default router;
