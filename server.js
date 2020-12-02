if (process.env.NODE_ENV !== 'production') {
    require('dotenv').parse();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// DEFAULT ROUTE
const indexRouter = require('./routes/index');

// EFFECTIVE JAVASCRIPT
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

// EXPRESS ROUTING
app.use(expressLayouts);
app.use(express.static('public'));

// MONGODB INITIALIZATION
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('connected to Mongoose'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);