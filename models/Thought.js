const { Schema, model } = require('mongoose');


// Schema to creat Thought model
const thoughtSchema = new Schema(
    {
        thought: {
            type: String,
            // type: Schema.Types.ObjectId,
            // default: () => new  Types.ObjectId(),
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Thought = model('thought', thoughtSchema)

module.exports = Thought;