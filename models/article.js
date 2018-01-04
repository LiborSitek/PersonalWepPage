const mongoose = require('mongoose');

// Article Schema
let articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        index: true
    },
    keywords: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

let Article = module.exports = mongoose.model('Article', articleSchema, 'articles');