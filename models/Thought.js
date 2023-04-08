const { Schema, model } = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    reactionBody: {
        type: String,
        maxLength: 280,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    createdAt: {
        Type: Date,
        default: Date.now,

    }
})

// Schema to create Thought model
const thoughtSchema = new mongoose.Schema(
    {
      thoughtText:{
        type: String,
        minLength: 1, 
        maxLength: 280,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // add Use a getter method to format the timestamp on query 
      },
        userName: {
            type: String,
            required: true,
        },
        reactions: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Reaction',
        },
      ],

    },
    {
      // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
      // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

    // Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
.virtual('reactionCount')
// Getter
.get(function () {
  return this.reactions.length;
});
  // Initialize our User model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;