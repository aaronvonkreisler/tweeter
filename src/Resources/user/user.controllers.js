import normalize from 'normalize-url';
import mongoose from 'mongoose';
import { User } from './user.model';
import { Notification } from '../notifications/notification.model';
import { uploadImageToS3 } from '../../services/imageUpload';
import { resizeImage } from '../../utils/images';

const ObjectId = mongoose.Types.ObjectId;

export const fetchCurrentUser = async (req, res) => {
   try {
      const user = await User.findById(req.user.id)
         .select('-password -email')
         .exec();
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
   const userId = req.user.id;
   const userToFollowId = req.params.id;
   try {
      const user = await User.findById(userId).select('-password');
      const userToBeFollowed = await User.findById(userToFollowId);
      const isFollowing =
         userToBeFollowed.followers.filter(
            (follower) => follower.user.toString() === req.user.id
         ).length > 0;

      if (isFollowing) {
         return res.status(400).json({ msg: 'User is already followed' });
      }

      userToBeFollowed.followers.unshift({ user: userId });
      user.following.unshift({ user: userToFollowId });

      await userToBeFollowed.save();
      await user.save();

      await Notification.insertNotification(
         userToFollowId,
         userId,
         'follow',
         userId
      );

      /* socketHandler.sendNotification({
         will need to populate the sender field (req.user.id)
      })
*/
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
         function (err) {
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

      // const profilePicResponse = await uploadImageToS3(files);
      const avatarSmall = await resizeImage(50, 50, files.image.data);
      const avatarLarge = await resizeImage(200, 200, files.image.data);

      const resizedSmallLocation = await uploadImageToS3(avatarSmall);
      const resizedLargeLocation = await uploadImageToS3(avatarLarge);

      const user = await User.findByIdAndUpdate(
         req.user.id,
         {
            // avatar: profilePicResponse.Location,
            avatarSmall: resizedSmallLocation.Location,
            avatarLarge: resizedLargeLocation.Location,
         },
         { new: true, select: '-password -email' }
      );

      res.json(user);
   } catch (err) {
      console.error(err);
      if (err.message === 'Input buffer contains unsupported image format') {
         res.status(400).json({ msg: 'Unsupported image format' });
      }
      res.status(500).send('Server Error');
   }
};

export const uploadUserBackgroundImage = async (req, res) => {
   try {
      const { files } = req;

      // const backgroundPicResponse = await uploadImageToS3(files);
      const backgroundImage = await resizeImage(600, 200, files.image.data);
      const imageLocation = await uploadImageToS3(backgroundImage);

      const user = await User.findByIdAndUpdate(
         req.user.id,
         { backgroundPicture: imageLocation.Location },
         { new: true, select: '-password -email' }
      );

      res.json(user);
   } catch (err) {
      if (err.message === 'Input buffer contains unsupported image format') {
         res.status(400).json({ msg: 'Unsupported image format' });
      }

      console.error(err);
      res.status(500).send('Server Error');
   }
};

export const fetchUsersFollowers = async (req, res) => {
   try {
      const username = req.params.username;

      const user = await User.findOne({ screen_name: username }).populate({
         path: 'followers',
         populate: {
            path: 'user',
            select: '-password -email -retweets',
         },
      });

      if (!user) {
         res.status(404).json({ msg: 'No user found by this username' });
      }

      res.json(user.followers);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};

export const fetchUsersFollowing = async (req, res) => {
   try {
      const username = req.params.username;

      const user = await User.findOne({ screen_name: username }).populate({
         path: 'following',
         populate: {
            path: 'user',
            select: '-password -email -retweets',
         },
      });

      if (!user) {
         res.status(404).json({ msg: 'No user found by this username' });
      }

      res.json(user.following);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};

export const getPinnedTweet = async (req, res) => {
   const username = req.params.username;
   try {
      const user = await User.findOne({ screen_name: username }).populate(
         'pinnedTweet'
      );

      res.json(user.pinnedTweet);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
};

export const updateProfile = async (req, res) => {
   const userId = req.user.id;

   const { name, bio, website, location } = req.body;

   const updateFields = {
      name,
      bio,
      location,
      website:
         website && website !== ''
            ? normalize(website, { forceHttps: true })
            : '',
   };

   try {
      const user = await User.findByIdAndUpdate(
         userId,
         { $set: updateFields },
         { new: true }
      )
         .select('-password -email')
         .lean()
         .exec();

      res.json(user);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};

export const getSuggestedUsers = async (req, res) => {
   const { max } = req.params;
   const user = await User.findById(req.user.id);

   try {
      const users = await User.aggregate([
         {
            $match: {
               _id: { $ne: ObjectId(user._id) },
               'followers.user': { $ne: ObjectId(user._id) },
            },
         },

         {
            $project: {
               screen_name: true,
               name: true,
               bio: true,
               avatar: true,
               verified: true,
               followers: true,
            },
         },
         {
            $sample: {
               size: max ? Number(max) : 20,
            },
         },
      ]);

      res.json(users);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};

export const searchUsers = async (req, res) => {
   const { searchTerm, offset } = req.params;

   if (!searchTerm) {
      return res
         .status(400)
         .json({ error: 'Please provide a user to search for.' });
   }
   try {
      const users = await User.aggregate([
         {
            $match: {
               $or: [
                  { name: { $regex: new RegExp(searchTerm), $options: 'i' } },
                  {
                     screen_name: {
                        $regex: new RegExp(searchTerm),
                        $options: 'i',
                     },
                  },
               ],
            },
         },
         {
            $skip: Number(offset),
         },
         {
            $limit: 10,
         },
         {
            $project: {
               _id: true,
               name: true,
               screen_name: true,
               avatar: true,
               verified: true,
            },
         },
      ]);

      if (users.length === 0) {
         return res.status(404).json({ msg: 'Could not find any users' });
      }

      res.json(users);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
   }
};
