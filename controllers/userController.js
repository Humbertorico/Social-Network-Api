const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    Course.find()
      .then((cusers) => res.json(users))
      .catch((err) => res.status(500).json(err));
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
  // Create a course
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((course) =>
        !user
          ? res.status(404).json({ message: 'No user found with that ID' })
          : User.findOneAndUpdate(
            { _id: req.params.userId},
            {$pull: { user: req.params.userId}},
            {new: true}
            )
      )
      .then((user) => !user
      ? res.status.json({ message: 'Course and students deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
  updateCourse(req, res) {
    Course.findOneAndUpdate(
      { _id: req.params.courseId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No course with this id!' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
};
