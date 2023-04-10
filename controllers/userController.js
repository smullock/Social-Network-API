const { User, Thought } = require('../models');


module.exports = {
    // Get all users
    getUser(req, res) {
            User.find({})
              .then((user) => res.json(user))
              .catch((err) => res.status(500).json(err));
          },
    ///GET a single user by its _id and populated thought and friend data
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select('-__v')
        .lean()
        .then(async (user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // create a new user
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

     //update a user
    updateUser(req, res) {
      User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
    // DELETE to remove user by its _id
    // Remove a Friend from friend list.
    deleteUser(req, res) {
      User.findOneAndRemove({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No such user exists' })
            : Thought.deleteMany ({_id:{$in: user.thoughts}})
        )
        .then(() => res.json({ message: "User and Thought deleted!" }))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
 //add a friend
 addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then(
        (user) =>
          !user
            ? res.status(404).json({ message: "No User found with this ID!" })
            : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
  








