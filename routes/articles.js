const express = require('express');
const router = express.Router();

// Brings in Article and User Models
let Article = require('../models/article');

// Get Article
router.get('/:url', (req, res) => {
    Article.findOne({url: req.params.url}, (err, article) => {
        if (err) throw err;
        res.render('index', {
            title: article.title,
            description: article.description,
            keywords: article.keywords,
            body: 'article.ejs',
            content: article.content
        });
    });
});

module.exports = router;