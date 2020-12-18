import { User } from './user.model';
import { uploadPhoto } from '../../services/imageUpload';
import { Profile } from '../profile/profile.model';

export const fetchCurrentUser = async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password').exec();
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
      res.status(500).json({ msg: 'Server Error' });
   }
};

export const fetchUserByUsername = async (req, res) => {
   try {
      const username = req.params.username;

      const user = await User.findOne({ screen_name: username })
         .select('-password')
         .lean()
         .exec();

      if (!user) {
         res.status(404).json({ msg: 'No user found by that username' });
      }

      res.json(user);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};

export const followUser = async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password');
      const userToBeFollowed = await User.findById(req.params.id);
      if (
         userToBeFollowed.followers.filter(
            (follower) => follower.user.toString() === req.user.id
         ).length > 0
      ) {
         return res.status(400).json({ msg: 'User is already followed' });
      }

      userToBeFollowed.followers.unshift({ user: req.user.id });
      user.following.unshift({ user: req.params.id });

      await userToBeFollowed.save();
      await user.save();

      // Return the followers of the user who is being followed.
      res.json(userToBeFollowed.followers);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

export const unfollowUser = async (req, res) => {
   try {
      const follower = await User.findById(req.params.id);

      await User.findByIdAndUpdate(
         req.user.id,
         { $pull: { following: { user: req.params.id } } },
         function (err, user) {
            if (err) console.error(err.message);
         }
      );

      // To have the updated follower list sent back for the user being unfollowed
      // I'm going to splice the requestor from the array rather than using the
      // findByIdAndUpdate method. Since we don't need the users updated "following"
      // array in the response, that method can be used for the requestor
      if (
         follower.followers.filter(
            (follower) => follower.user.toString() === req.user.id
         ).length === 0
      ) {
         return res.status(400).json({ msg: 'User has not yet been followed' });
      }

      const removeIndex = follower.followers.map((follow) =>
         follow.user.toString().indexOf(req.user.id)
      );
      follower.followers.splice(removeIndex, 1);
      await follower.save();

      res.json(follower.followers);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};

export const uploadUserAvatar = async (req, res) => {
   try {
      const { files } = req;
      const regex = /(image\/jpg)|(image\/jpeg)|(image\/png)/i;
      if (!files.image.mimetype.match(regex)) {
         res.status(422).json({
            msg: 'Invalid file type. Please upload a JPG or PNG filetype.',
         });
      } else {
         const profilePicResponse = await uploadPhoto(files);

         const user = await User.findByIdAndUpdate(
            req.user.id,
            { avatar: profilePicResponse.Location },
            { new: true, select: '-password' }
         );

         await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: { profile_picture: profilePicResponse.Location } },
            { upsert: true }
         );

         res.json(user);
      }
   } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
   }
};

export const fetchUsersFollowers = async (req, res) => {
   try {
      const userId = req.params.id;

      const user = await User.findById(userId).populate({
         path: 'followers',
         populate: {
            path: 'user',
            select: '-password -email -retweets',
         },
      });

      if (!user) {
         res.status(404).json({ msg: 'No user found by this ID' });
      }

      res.json(user.followers);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};

export const fetchUsersFollowing = async (req, res) => {
   try {
      const userId = req.params.id;

      const user = await User.findById(userId).populate({
         path: 'following',
         populate: {
            path: 'user',
            select: '-password -email -retweets',
         },
      });

      if (!user) {
         res.status(404).json({ msg: 'No user found by this ID' });
      }

      res.json(user.following);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};
