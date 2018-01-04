const express = require('express');
const router = express.Router();

// Brings in User Model
let User = require('../models/user');

let pageData = {
    title: 'Libor Sitek - Nastavení stránky',
    keywords: 'nastavení, uživatel, PHP, HTML, Javascript',
    description: 'Možnost nastavení stránky přihlášeným uživatelem.',
    body: 'settings.ejs'
};

// Get Setting Form
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('index', pageData);
});

// Update User Settings
router.post('/', (req, res) => {
    let setting = {};
    setting.font = req.body.font;
    setting.background = req.body.background;
    setting.image2 = req.body.image2;
    setting.image1 = req.body.image1;
    let query = {_id: req.user._id};
    User.update(query, setting, (err) => {
        if (err) throw err;
        req.flash('success', 'Vaše nastavení bylo změněno');
        res.redirect('/settings');
    });
});

module.exports = router;

// Access Control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('danger', 'Prosím přihlašte se');
    res.redirect('/login');
}