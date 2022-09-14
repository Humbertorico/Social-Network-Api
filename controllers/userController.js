const { User, Thought } = require('../models');

module.exports = {
    //   getUsers
    getUsers(req, res) {
      User.find({})
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
        });
    },

  // Get single user
  getSingleUser(req, res) {
    Course.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then((course) =>
        !User
          ? res.status(404).json({ message: 'No User found with that ID' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete user
  deleteUser({params},res){
    User.findOneAndDelete({ _id: params.id})
    .then((dbUserData)=> {
      if(!dbUserData){
        return res.status(404).json ({message:'no user found with id'});
      }
      return Thought.deleteMany({_id:{$in: dbUserData.Thought} });
    })
    .then(()=>{
      res.json({message: 'user and thoughts deleted!'});
    })
    .catch((err) => res.json(err));
  },
  // Update a user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "no user found with id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  addFriend(req, res){
    User.findOneAndUpdate(
    {_id: req.params.userId},
    {$addtoset:{friends: req.params.friendId}},
    {runValidators: true, new: true},
    )
    .then((User)=>
    !User
    ? res.status(404).json({message:'no user found with id'})
    : res.json(User)
    )
    .catch((err)=> res.status(500).json(err));
  },
  deletefriend(req, res){
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$addtoset:{friends: req.params.friendId}},
      {new:true}
    )
    .then(
      (User)=>
      !User
      ? res.status(404).json({message: 'no user found with id'})
      : res.json(User)
    )
    .catch((err)=> res.json(500).json(err));
  },

}
