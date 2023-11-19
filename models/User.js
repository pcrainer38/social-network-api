const { Schema, model } = require('mongoose');
const friendSchema = require('./Friend')
const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true,    
        },
        email: {
            type: String,
            required: true,
            set: v => v.toLowerCase(),
        },
        friends: [{
            type: String,
        }],
        thought: [{
            type: Schema.Types.ObjectId,
            max_length: 280,
            ref: 'Thought',
        }],
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

const User = model('user', userSchema);

module.exports = User;