const express = require('express');
const router = express.Router();
const fs = require('fs');
const folder = './public/foto/';

let pageData = {
    title: 'Libor Sitek - Fotogalerie',
    keywords: 'fotogalerie, programátor, PHP, HTML, Javascript',
    description: 'Fotogalerie začínajícího programátora webových aplikací.',
    body: 'fotogalery.ejs'
};

// Get Contact Form
router.get('/', (req, res) => {
    fs.readdir(folder, (err, files) => {
        if (err) throw err;
        pageData.photos = files;
        pageData.list = 0;
        res.render('index', pageData);
    });
});

module.exports = router;