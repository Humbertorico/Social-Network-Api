// ObjectId() method for converting studentId string into an ObjectId for querying database
// const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .sort({ createAt: -1 })
      .then((Thought) => {
        res.json(Thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // get thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'no thought found with id' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // create thought by id 
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: 'Thought created but no user with this id!' });
        }

        res.json({ message: 'Thought has been successfully created!' });
      })
      .catch((err) => res.json(err));
  },

  // update thought
  UpdateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: ' no thought with this id' })
          : res.json(Thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });

  },
  // delete thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : User.findOneAndUpdate(
            { thought: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )
      )
      .then((Thought)=>
      !Thought
      ? res.status(404).json({
        message: 'no thought found with id',
      })
      : res.json ({message: ' thought deleted'})
      )
      .catch((err)=> res.status(500).json(err));
  },
// add reaction
addReaction({ params,body}, res){
  Thought.findOneAndUpdate(
    {_id: params.thoughtId},
    {$addToSet: { reactions: body}},
    { new: true, runValidators: true}
  )
  .then((dbThoughtData)=>{
    if (!dbThoughtData){
      res.status(404).json({message: ' unable to find thought with id'});
      return;
    }
    res.json(dbThoughtData);
  })
  .catch((err)=> res.json(err));
},

// remove reaction
removeReaction({params}, res){
  Thought.findOneAndUpdate(
    {_id: params.thoughtId},
    {$pull: {reactions:{ reactionId: params.reactionId}}},
    {new: true}
  )
  .then((dbThoughtData)=> res.json(dbThoughtData))
  .catch((err)=> res.json(err));
},
}

