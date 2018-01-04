const mongoose = require('mongoose');

// Message Schema
let messageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

let Message = module.exports = mongoose.model('Message', messageSchema, 'messages');