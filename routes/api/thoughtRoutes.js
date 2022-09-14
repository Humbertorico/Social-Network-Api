const router = require('express').Router();
const {
  getThoughts,
  getThoughtById,
  createThought,
  UpdateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/ThoughtController.js');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(UpdateThought)
  .delete(deleteThought);

// api/ reactions
  router.route("/:thoughtId/reactions").post(addReaction);

  // /api/reaction/:reactionId
  router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
