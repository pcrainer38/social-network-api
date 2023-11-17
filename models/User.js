const {Schema, model } = require('mongoose');
const userSchema = require('./User');

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
        },
        friends: [friendsSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const User = model('user', userSchema);

module.exports = User;