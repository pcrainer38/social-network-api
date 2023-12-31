const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to creat Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },           
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        reactions: [
            reactionSchema,
        ]
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Thought = model('thoughts', thoughtSchema)

module.exports = Thought;