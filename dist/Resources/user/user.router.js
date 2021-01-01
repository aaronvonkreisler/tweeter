"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = require("./user.controllers");

var router = (0, _express.Router)(); // @route            GET api/user/:searchTerm/:offset/search
// @description     Search for users

router.get('/:searchTerm/:offset/search', _user.searchUsers); // @route            GET api/user/suggested/:max?
// @description     Get suggested users to follow

router.get('/suggested/:max?', _user.getSuggestedUsers); // @route            GET api/user/current
// @description      Fetch the current user from database

router.get('/current', _user.fetchCurrentUser); // @route            PUT api/user/current
// @description      Update a users profile - bio, location, website

router.put('/current', _user.updateProfile); // @route            GET api/user/:username
// @description      Fetch the current user from database

router.get('/:username', _user.fetchUserByUsername); // @route            GET api/user/:id/followers
// @description      Get a users followers - each follower will be populated

router.get('/:username/followers', _user.fetchUsersFollowers); // @route            GET api/user/:id/following
// @description      Get a users following - each follower will be populated

router.get('/:username/following', _user.fetchUsersFollowing); // @route            PUT api/user/follow/:id
// @description      Follow a user by id

router.put('/follow/:id', _user.followUser); // @route            PUT api/user/unfollow/:id
// @description      Unfollow a user by id

router.put('/unfollow/:id', _user.unfollowUser); // @route            PUT api/user/avatar
// @description      Update profile picture

router.put('/avatar', _user.uploadUserAvatar); // @route            PUT api/user/background
// @description      Update background picture

router.put('/background', _user.uploadUserBackgroundImage); // @route            GET api/user/:username/pinned
// @description      Get a users pinned tweet

router.get('/:username/pinned', _user.getPinnedTweet);
var _default = router;
exports.default = _default;