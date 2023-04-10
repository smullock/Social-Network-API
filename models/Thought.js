const { Schema, model, Types } = require('mongoose');

const moment = require('moment')

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId
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
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
       },node 
})

// Schema to create Thought model
const thoughtSchema = new Schema(
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
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
       },
        userName: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],

    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
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