const { Schema, model } = require('mongoose');


// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true,
            trim: true,    
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            set: v => v.toLowerCase(),
        },
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
        }],
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thoughts',
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