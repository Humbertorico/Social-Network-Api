const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength:1,
      maxlength: 280,
    },
    createdAt: {
      type: Data,
      default: Date.now,
      maxlength: 50,
      minlength: 4,
      default: 'Unnamed assignment',
    },
    username: {
      type: string,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const thought = model('thought', thoughtSchema);

module.exports = thought;
