import { Router } from 'express';
import {
   addTweetToBookmarks,
   removeTweetFromBookmarks,
   getAllBookmarks,
   removeAllBookmarks,
} from './bookmarks.controllers';

const router = Router();

// @route            GET api/bookmarks
// @description     Get all the tweets in a users bookmarks
router.get('/', getAllBookmarks);

// @route            POST api/bookmarks/:id
// @description      Post a tweet to a users bookmarks

router.post('/:id', addTweetToBookmarks);

// @route            PUT api/bookmarks/:id
// @description     Remove a tweet to a users bookmarks

router.put('/:id', removeTweetFromBookmarks);

// @route            DELETE api/bookmarks
// @description     Delete all of a  users bookmarks
router.delete('/', removeAllBookmarks);

export default router;
