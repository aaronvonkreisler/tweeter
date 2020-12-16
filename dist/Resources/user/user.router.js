"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = require("./user.controllers");

var router = (0, _express.Router)(); // @route            GET api/user/current
// @description      Fetch the current user from database

router.get('/current', _user.fetchCurrentUser); // @route            GET api/user/:username
// @description      Fetch the current user from database

router.get('/:username', _user.fetchUserByUsername); // @route            PUT api/user/follow/:id
// @description      Follow a user by id

router.put('/follow/:id', _user.followUser); // @route            PUT api/user/unfollow/:id
// @description      Unfollow a user by id

router.put('/unfollow/:id', _user.unfollowUser); // @route            PUT api/user/avatar
// @description      Update profile picture

router.put('/avatar', _user.uploadUserAvatar);
var _default = router;
exports.default = _default;