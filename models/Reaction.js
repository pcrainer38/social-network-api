const { Schema, Types } = require('mongoose');

// Schema to creat Thought model
const reactionSchema = new Schema(
    {   
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
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
        }
    },
    {
        toJSON: {
            getters: true,
        },
    }
);


module.exports = reactionSchema;