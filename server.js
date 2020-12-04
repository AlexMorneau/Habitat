

// INITIALIZE EXPRESS
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');

// INITIALIZE ROUTES
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

// BODY PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// EXPRESS SESSION (https://www.npmjs.com/package/express-session)
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// FLASH MESSAGE (https://www.npmjs.com/package/connect-flash)
app.use(flash());
app.use((req, res, next) => {
    // local variables for registration success/error message
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// EJS TEMPLATING
app.use(expressLayouts);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

// ROUTE RENDERING
app.get ('/login', (req, res) => {
    res.render('login.ejs');
});

app.get ('/register', (req, res) => {
    res.render('register.ejs');
});

// MONGODB INITIALIZATION
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// ROUTE IMPLEMENTATION
app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(process.env.PORT || 3000);