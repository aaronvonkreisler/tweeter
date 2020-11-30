import { User } from './user.model';

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
      res.status(500).send('Server Error');
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
      res.status(500).send('Server Error');
   }
};
