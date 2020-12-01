import { Profile } from './profile.model';
import {
   uploadProfilePhoto,
   uploadBackgroundPhoto,
} from '../../services/imageUpload';

//TODO -- there must be two pictures or else the server will crash,
// as it wont be able to read the mimetype of a file that isn't there.

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
