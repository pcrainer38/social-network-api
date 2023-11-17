const { Schema, model } = require('mongoose');
const userSchema = require('./User')

const friendSchema = new Schema(
{
    friendName: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'User',
    },
    

},
{ 
    toJSON: {
        getters: true,
    }
}
);

const Friend = model('friend', friendSchema);

module.exports = Friend;