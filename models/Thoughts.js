const { Schema } = require('mongoose');
// const thoughtsSchema = require('./User');

// Schema to create Thoughts model
const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
            createdAt: Date,
        },
        username: {
            type: String,
            required: true,
        },
        
    });


module.exports = thoughtsSchema;
