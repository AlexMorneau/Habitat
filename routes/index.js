const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// INDEX PAGE: LOGIN OR REGISTER
router.get('/', (req, res) => {
    res.render('index');
});

// DASHBOARD: AUTHENTICATED USERS
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        email: req.user.email
    });
});

module.exports = router;