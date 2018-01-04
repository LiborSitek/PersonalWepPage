const mongoose = require('mongoose');

// User Schema
let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    font: {
        type: String,
        default: 'Verdana'
    },
    background: {
        type: String,
        default: '#333'
    },
    image2: {
        type: String,
        default: 'pozadi2.png'
    },
    image1: {
        type: String,
        default: 'pozadi1.jpg'
    }
});

let User = module.exports = mongoose.model('User', userSchema, 'users');