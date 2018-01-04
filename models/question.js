const mongoose = require('mongoose');
const questionsForPage = 10;
const numberOfQuestions = 60;

// question Schema
let questionSchema = mongoose.Schema({
    number: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    a: {
        type: String,
        required: true
    },
    b: {
        type: String,
        required: true
    },
    c: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

let Question = module.exports = mongoose.model('Question', questionSchema, 'questions');

module.exports.generateNumbers = function() {
    let numbers = [];
    while (numbers.length < questionsForPage) {
        let rand = Math.floor(Math.random() * numberOfQuestions) + 1;
        if (numbers.indexOf(rand) === -1) {
            numbers.push(rand);
        }
    }
    return numbers;
};

module.exports.getQuestions = function(numbers) {
    let questions = [];
    numbers.forEach(function(number) {
        questions.push({ number: number });
    });
    return questions;
};

module.exports.checkAnswers = function(questions, answers) {
    let correct = 0;
    questions.forEach(function(question) {
        if (question.answer === answers[question.number]) correct++;
    });
    return correct;
};

module.exports.questionsForPage = questionsForPage;