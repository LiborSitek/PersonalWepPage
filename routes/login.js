const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Brings in User Model
let User = require('../models/user');

let pageData = {
    title: 'Libor Sitek - Přihlašovací formulář',
    keywords: 'přihlášení, registrace, nastavení, programátor, PHP, HTML, Javascript, MySQL, front-end, developer',
    description: 'Přihlašovací formulář, po přihlášení je možno měnit nastavení aplikace.',
    body: 'login.ejs'
};

// Get Login and Register Forms
router.get('/', (req, res) => {
    if (req.user) res.redirect('/settings');
    else {
        pageData.regNotice = '';
        pageData.regname = '';
        res.render('index', pageData);
    }
});

// Register POST Proccess
router.post('/register', [
    check('antispam', 'Špatně zadaný antispam').custom((value) => Number(value) === new Date().getFullYear()),
    check('name', 'Nevyplnil jste Vaše uživatelské jméno').isLength({ min: 1 }).trim(),
    check('password', 'Nevyplnil jste Vaše heslo').isLength({ min: 1 }).trim(),
    check('password2', 'Zadaná hesla nesouhlasí').custom((value, { req }) => value === req.body.password),
    sanitize('*').trim().escape()
],(req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let errorMessages = errors.mapped();
        let regNotice = '';
        for (let attr in errorMessages) {
            regNotice += errorMessages[attr].msg + '<br />';
        }
        pageData.regNotice = regNotice;
        pageData.regname = req.body.name;
        res.render('index', pageData);
    } else {
        let username = req.body.name;
        User.findOne({username: username}, (err, user) => {
            if (err) throw err;
            if (user) {
                pageData.regNotice = 'Uživatel se zadaným jménem již existuje';
                pageData.regname = username;
                res.render('index', pageData);
            } else {
                let newUser = new User({ username: username });
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save((err) => {
                            if (err) throw err;
                            req.flash('success', 'Jste zaregistrován a můžete se přihlásit');
                            res.redirect('/login');
                        });
                    });
                });
            }
        });
    }
});

// Login POST Proccess
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/settings',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success', 'Jste odhlášený');
    res.redirect('/login');
});

module.exports = router;