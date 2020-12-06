import { Profile } from './profile.model';
import {
   uploadProfilePhoto,
   uploadBackgroundPhoto,
} from '../../services/imageUpload';
import { TemporaryCredentials } from 'aws-sdk';

// TODO -- handle error if file size is too large. defaults to 403 status

export const createOrUpdateProfile = async (req, res) => {
   try {
      const { body, files } = req;
      const regex = /(image\/jpg)|(image\/jpeg)|(image\/png)/i;
      if (!files.profile.mimetype.match(regex)) {
         res.status(422).json({
            msg: 'Invalid file type. Please upload a JPG or PNG filetype.',
         });
      } else {
         const profilePicResponse = await uploadProfilePhoto(files);
         const profileFields = {
            user: req.user.id,
            profile_picture: profilePicResponse.Location,
         };
         let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
         ).populate({ path: 'user', select: '-password' });

         res.json(profile);
      }
   } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
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
      res.status(500).send('Server Error');
   }
};
