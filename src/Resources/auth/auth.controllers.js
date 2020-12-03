import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

import { User } from '../user/user.model';
import { newToken } from '../../utils/auth';

export const signIn = async (req, res) => {
   const { email, password } = req.body;
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      let user = await await User.findOne({ email });

      if (!user) {
         return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
         return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const token = newToken(user);
      return res.status(201).send({ token });
   } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
   }
};

export const register = async (req, res) => {
   const { email, password, name, screen_name } = req.body;
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      let user = await User.findOne({ email });

      if (user) {
         return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = await User.create({
         name,
         email,
         password,
         screen_name,
      });

      const token = newToken(user);

      return res.status(201).send({ token });
   } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
         return res
            .status(422)
            .send({ errors: [{ msg: 'Username is taken' }] });
      }
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};
