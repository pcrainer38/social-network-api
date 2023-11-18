const { Schema, model } = require('mongoose');


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
            type: String,
            max_length: 280,
        }]

    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const User = model('user', userSchema);

module.exports = User;