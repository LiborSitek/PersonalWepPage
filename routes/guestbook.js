const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

// Brings Message Model
let Message = require('../models/message');
const weekDays = ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'];
let pageData = {
    title: 'Libor Sitek - Návštěvní kniha',
    keywords: 'vzkazník, guestbook, programátor, PHP, HTML, Javascript, MySQL, front-end, developer',
    description: 'Návštěvní kniha začínajícího programátora webových aplikací.',
    body: 'guestbook.ejs'
};

// Pretty Date
Date.prototype.getPrettyDate = function() {
    let now = new Date();
    if (this.getFullYear() !== now.getFullYear()) {
        return `${this.getDate()}. ${this.getMonth() + 1}. ${this.getFullYear()}`;
    }
    if (this.toLocaleDateString() === now.toLocaleDateString()) {
        return 'Dnes';
    }
    now.setDate(now.getDate() -1);
    if (this.toLocaleDateString() === now.toLocaleDateString()) {
        return 'Včera';
    }
    now.setDate(now.getDate() + 2);
    if (this.toLocaleDateString() === now.toLocaleDateString()) {
        return 'Zítra';
    }
    let months = ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'];
    return `${this.getDate()}. ${months[this.getMonth()]}`;
};

// Get GuestBook Form
router.get('/', (req, res) => {
    Message.find({}, (err, messags) => {
        if (err) throw err;
        pageData.msg_name = '';
        pageData.msg_content = '';
        pageData.messags = messags;
        res.render('index', pageData);
    }).sort({date: -1});
});

// Submit POST Message
router.post('/', [
    check('antispam', 'Špatně zadaný antispam').custom((value) => value.toLowerCase() === weekDays[new Date().getDay()]),
    check('name', 'Nevyplnil jste Vaše jméno').isLength({ min: 1 }).trim(),
    check('content', 'Nezadal jste žádný vzkaz').isLength({ min: 1 }).trim(),
    sanitize('*').trim().escape()
],(req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let errorMessages = errors.mapped();
        for (let attr in errorMessages) {
            req.flash('danger', errorMessages[attr].msg);
        }
        Message.find({}, (err, messags) => {
            if (err) throw err;
            pageData.msg_name = req.body.name;
            pageData.msg_content = req.body.content;
            pageData.messags = messags;
            res.render('index', pageData);
        }).sort({date: -1});
    } else {
        let message = new Message();
        message.name = req.body.name;
        message.content = req.body.content;
        message.save((err) => {
            if (err) throw err;
            req.flash('success', 'Váš vzkaz byl úspěšně uložen');
            res.redirect('/guestbook');
        });
    }
});

module.exports = router;