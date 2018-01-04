const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const weekDays = ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'];
// const sendmail = require('sendmail')();

let pageData = {
    title: 'Libor Sitek - Kontaktní formulář',
    keywords: 'kontakt, formulář, email, programátor, PHP, HTML, Javascript, MySQL, front-end, developer',
    description: 'Kontaktní formulář začínajícího programátora webových aplikací.',
    body: 'contact.ejs'
};

// Get Contact Form
router.get('/', (req, res) => {
    pageData.name = '';
    pageData.email = '';
    pageData.message = '';
    res.render('index', pageData);
});

// Proccess Contact Form Data
router.post('/', [
    check('antispam', 'Špatně zadaný antispam').custom((value) => value.toLowerCase() === weekDays[new Date().getDay()]),
    check('name', 'Nevyplnil jste Vaše jméno').isLength({ min: 1 }).trim(),
    check('email', 'Nevyplnil jste Vaši emailovou adresu').isLength({ min: 1 }).trim(),
    check('email', 'Emailová adresa nemá správný formát').isEmail(),
    check('message', 'Nevyplnil jste emailovou zprávu').isLength({ min: 1 }).trim(),
    sanitize('*').trim().escape()
], (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let errorMessages = errors.mapped();
        for (let attr in errorMessages) {
            req.flash('danger', errorMessages[attr].msg);
        }
        pageData.name = req.body.name;
        pageData.email = req.body.email;
        pageData.message = req.body.message;
        res.render('index', pageData);
    } else {
        /* sendmail({
            from: req.body.email,
            to: 'liborsitek@seznam.cz',
            subject: req.body.name,
            html: req.body.message
        }, (err, reply) => {
            if (err) throw err;
            console.log(reply); 
        }); */
        req.flash('success', 'Vaše zpráva byla odeslána');
        res.redirect('contact');
    }
});

module.exports = router;