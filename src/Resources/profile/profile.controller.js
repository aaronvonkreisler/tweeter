import { Profile } from './profile.model';
import { uploadPhoto } from '../../services/imageUpload';

// TODO -- handle error if file size is too large. defaults to 403 status

export const uploadUserBackgroundPic = async (req, res) => {
   try {
      const { files } = req;
      const regex = /(image\/jpg)|(image\/jpeg)|(image\/png)/i;
      if (!files.image.mimetype.match(regex)) {
         res.status(422).json({
            msg: 'Invalid file type. Please upload a JPG or PNG filetype.',
         });
      } else {
         const backgroundPicResponse = await uploadPhoto(files);

         const profileFields = {
            user: req.user.id,
            background_picture: backgroundPicResponse.Location,
         };

         const profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
         ).populate({ path: 'user', select: '-password' });

         res.json(profile);
      }
   } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
   }
};

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
