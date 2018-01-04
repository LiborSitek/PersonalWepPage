const express = require('express');
const router = express.Router();
const NPA = require('npa')();
const accents = require('remove-accents');

let pageData = {
    title: 'Libor Sitek - Morseovka Koder',
    keywords: 'AJAX, PHP, HTML, Javascript, MySQL, morseovka, aplikace',
    description: 'Jednoduchá aplikace pro převod abecedních znaků do morseovky.',
    body: 'morsecode.ejs'
};

// Get Morse Code Forms
router.get('/', (req, res) => {
    res.render('index', pageData);
});

// POST Morse Code
router.post('/MorseCoder', (req, res) => {
    res.send(NPA.toMorse(accents.remove(req.body.text)));
});

// POST Morse Decode
router.post('/MorseDecoder', (req, res) => {
    res.send(NPA.fromMorse(req.body.text));
});

module.exports = router;