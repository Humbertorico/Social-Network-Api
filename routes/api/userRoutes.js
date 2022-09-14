const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deletefriend
} = require('../../controllers/userController');

// /api/user/createuser
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// post frined/ delete frined
router.route('/:userId/friends/:friendId').delete(deletefriend).post(addFriend);

module.exports = router;
