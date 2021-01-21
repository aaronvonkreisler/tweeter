import jwt from 'jsonwebtoken';
import keys from '../config/keys';

export const newToken = (user) => {
   return jwt.sign({ user: { id: user.id } }, keys.jwt, {
      expiresIn: keys.jwtExp,
   });
};

export const protect = async (req, res, next) => {
   const token = req.header('x-auth-token');

   if (!token) {
      return res.status(401).json({ msg: 'Unauthorized' });
   }

   try {
      const decoded = jwt.verify(token, keys.jwt);
      req.user = decoded.user;
      next();
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Token is not valid' });
   }
};
