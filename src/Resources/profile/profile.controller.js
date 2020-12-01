import { Profile } from './profile.model';
import { uploadPhoto } from '../../services/imageUpload';

export const createOrUpdateProfile = async (req, res) => {
   try {
      const { body, files } = req;
      const regex = /(image\/jpg)|(image\/jpeg)|(image\/png)/i;
      if (!files.image.mimetype.match(regex)) {
         res.status(422).json({ msg: 'Invalid file type' });
      } else {
         const response = await uploadPhoto(files);

         if (res.status === 413) {
            console.log('it worked');
         }

         const profileFields = {
            user: req.user.id,
            profile_picture: response.Location,
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
