const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
  } = require('../../controllers/userController');

///api/users GET all users and Post
  router.route('/').get(getUsers).post(createuser);

  // /api/users/:userId GET one user, PUT and DELETE by user's ID
  router.route('/:userId') 
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser)

// /api/users/:userId/friends/:friendId POST and DELETE a friend by ID
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;