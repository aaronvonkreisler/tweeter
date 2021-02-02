import { Profile } from './profile.model';

export const getCurrentUsersProfile = async (req, res) => {
   try {
      const profile = await Profile.find({ user: req.user.id })
         .populate({ path: 'user', select: '-password' })
         .exec();

      if (!profile) {
         res.status(404).json({ msg: 'No profile found' });
      }

      res.json(profile);
   } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
         return res.status(404).json({ msg: 'No Profile found!' });
      }
      res.status(500).json({ msg: 'Server Error' });
   }
};

export const getProfileByScreenName = async (req, res) => {
   try {
      const profile = await Profile.findOne({
         screen_name: req.params.screen_name,
      }).populate({
         path: 'user',
         select: '-password',
      });

      if (!profile) {
         return res.status(400).json({ msg: 'No profile found' });
      }

      res.json(profile);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};
