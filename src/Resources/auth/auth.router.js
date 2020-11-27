import { Router } from 'express';
import { register, signIn } from './auth.controllers';
import { check } from 'express-validator';
const router = Router();

router.post(
   '/register',
   [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password must be at least 6 characters').isLength({
         min: 6,
      }),
      check('name', 'Please include your name').not().isEmpty(),
      check(
         'screen_name',
         'Username must be between 3 and 15 characters'
      ).isLength({
         min: 3,
         max: 15,
      }),
      check('date_of_birth', 'Please provide your date of birth')
         .not()
         .isEmpty(),
   ],
   register
);

router.post(
   '/signin',
   [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
   ],
   signIn
);
export default router;
