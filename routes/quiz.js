const express = require('express');
const router = express.Router();

// Brings in Article and User Models
let Question = require('../models/question');

let pageData = {
    title: 'Libor Sitek - Test HTML/CSS',
    keywords: 'test, otázky, HTML, CSS',
    description: 'Jednoduchý test z oblasti HTML a CSS.',
    body: 'quiz.ejs'
};

// Get Quiz
router.get('/', (req, res) => {
    if(!req.session.questNums) req.session.questNums = Question.generateNumbers();
    Question.find({ $or: Question.getQuestions(req.session.questNums) }, (err, questions) => {
        if (err) throw err;
        pageData.questions = questions;
        pageData.answers = (req.session.answers === undefined) ? {} : req.session.answers;
        req.session.answers = undefined;
        res.render('index', pageData);
    });
});

// Get New Quiz
router.get('/new', (req, res) => {
    req.session.questNums = undefined;
    res.redirect('/quiz');
});

// POST Quiz Check
router.post('/check', (req, res) => {
    if (attrCount(req.body) < Question.questionsForPage) {
        req.flash('danger', 'Nebyly vybrány odpovědi na všechny otázky');
        req.session.answers = req.body;
        res.redirect('/quiz');
    } else {
        Question.find({ $or: Question.getQuestions(req.session.questNums) }, (err, questions) => {
            let correct = Question.checkAnswers(questions, req.body);
            if (correct === 10) req.flash('success', 'Všechny Vaše odpovědi jsou správné!');
            else req.flash('danger', `Počet správných dopovědí: ${correct}/10`);
            pageData.questions = questions;
            pageData.answers = req.body;
            res.render('index', pageData);
        });
    }
});

module.exports = router;

function attrCount(object) {
    let count = 0;
    for (let property in object) {
        count++;
    }
    return count;
}