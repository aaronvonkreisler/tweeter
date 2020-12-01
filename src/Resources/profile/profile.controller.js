import { Profile } from './profile.model';
import {
   uploadProfilePhoto,
   uploadBackgroundPhoto,
} from '../../services/imageUpload';

export const createOrUpdateProfile = async (req, res) => {
   try {
      const { body, files } = req;
      console.log(files);
      debugger;
      const regex = /(image\/jpg)|(image\/jpeg)|(image\/png)/i;
      if (
         !files.profile.mimetype.match(regex) ||
         !files.background.mimetype.match(regex)
      ) {
         res.status(422).json({ msg: 'Invalid file type' });
      } else {
         const profilePicResponse = await uploadProfilePhoto(files);
         const backgroundPicResponse = await uploadBackgroundPhoto(files);
         const profileFields = {
            user: req.user.id,
            profile_picture: profilePicResponse.Location,
            background_picture: backgroundPicResponse.Location,
         };
         let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
         );
         res.json(profile);
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};
