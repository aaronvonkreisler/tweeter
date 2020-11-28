import { User } from './user.model';

export const fetchCurrentUser = async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

export const fetchUserById = async (req, res) => {
   try {
      const user = await User.findById(req.params.id)
         .select('-password')
         .lean()
         .exec();
      res.json(user);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};
