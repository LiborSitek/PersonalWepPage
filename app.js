const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const expressMessages = require('express-messages');
const passport = require('passport');
const config = require('./config/database');

// Routes files
let articles = require('./routes/articles');
let contact = require('./routes/contact');
let guestbook = require('./routes/guestbook');
let morsecode = require('./routes/morsecode');
let quiz = require('./routes/quiz');
let login = require('./routes/login');
let settings = require('./routes/settings');
let fotogalery = require('./routes/fotogalery');

// Init app
const app = express();

// Database Connection
mongoose.connect(config.database);
const db = mongoose.connection;

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Check for DB errors and connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});
db.on('error', (err) => {
    console.log(err);
});

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    //cookie: { secure: true }
}));

// Express Messages Middleware
app.use(flash());
app.use((req, res, next) => {
    res.locals.messages = expressMessages(req, res);
    next();
});

// Passport Config
require('./config/passport')(passport);

// Password Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Brings in Article Model
let Article = require('./models/article');

// Home route
app.get('/', (req, res) => {
    Article.findOne({url: 'uvod'}, (err, article) => {
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

app.use('/articles', articles);
app.use('/contact', contact);
app.use('/guestbook', guestbook);
app.use('/morsecode', morsecode);
app.use('/quiz', quiz);
app.use('/login', login);
app.use('/settings', settings);
app.use('/fotogalery', fotogalery);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Stránka nenalezena');
    err.status = 404;
    next(err);
});

// Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('index', {
        title: 'Chyba 404',
        description: '',
        keywords: '',
        body: 'error.ejs',
        message: err.message,
        status: err.status
    });
});

// Start Server
app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});