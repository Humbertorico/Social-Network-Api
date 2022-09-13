const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment');

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
    thoughts: {
      type: Schema.types.ObjectId,
      reference: 'thought'
    },
  },
{
  friends:{
    type: Schema.types.ObjectId,
    reference: 'User'
  }
}

  
);

usernameSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', usernameSchema);

module.exports = User;
