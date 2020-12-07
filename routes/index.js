const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { ensureAuthenticated } = require('../config/auth');
const propertyData = "";

const app = express();
const path = require('path');
const dir = path.join(__dirname, 'public');

app.use(express.static(dir));


// INDEX PAGE: LOGIN OR REGISTER
router.get('/', (req, res) => {
    res.render('index');
});

console.log("property data: ");
console.log(propertyData);

// DASHBOARD: AUTHENTICATED USERS -> This is like a controller
// took this out so I can test: ensureAuthenticated
router.get('/dashboard', ensureAuthenticated, (req, res) => {

    fetch("https://ambrotus.github.io/torontoListings.json")
        .then(response => {
            return response.json();
        }).then(data => {
            res.render('dashboard', {
                email: req.user.email,
                propertyData: data
        });
    });
});


module.exports = router;