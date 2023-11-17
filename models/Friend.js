const { Schema, model } = require('mongoose');

const friendSchema = new Schema(
{
    friendName: {
        type: String,
        required: false,
        ref: 'User',
    },

});

const Friend = model('friend', friendSchema);

module.exports = Friend;