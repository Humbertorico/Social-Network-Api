const { Schema, model } = require('mongoose');

// Schema to create Username 
const usernameSchema = new Schema(
  {
    Username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: ['fill with a valid email']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
  },
  {
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  }


);

usernameSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', usernameSchema);

module.exports = User;
