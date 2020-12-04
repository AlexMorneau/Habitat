const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// login
router.get('/login', (req, res) => {
    res.render('login');
});

// register
router.get('/register', (req, res) => {
    res.render('register');
});


// register handler
router.post('/register', (req, res) => {
    const { email, password, password2 } = req.body;
    let errors = [];

    if (!email || !password || !password2 ) {
        errors.push({ message: "Please enter all fields." });
    }

    if (password !== password2) {
        errors.push({ message: "Passwords do not match." });
    }

    if (password.length < 6) {
        errors.push({ message: "Password must be at least 6 characters." })
    }

    if (errors.length > 0) {
        // error(s) found, render page with variables for error alert
        res.render('register', {
            errors,
            email,
            password,
            password2
        });
    } else {
        // next validation; either email exists or it gets added to db
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    // user already exists; add error and render
                    errors.push({ message: 'Email is already registered' });
                    res.render('register', {
                        errors,
                        email,
                        password,
                        password2
                    });
                } else {
                    // user does not exist; create account
                    const newUser = new User({
                        email,
                        password
                    });
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash; // hash password
                            newUser.save()
                                .then(user => {
                                    // after user is saved to db,
                                    // flash message and redirect to login:
                                    req.flash('success_msg', 'Registration complete! Please log in.');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err))
                    }));
                }
            });
    }
    console.log(req.body);
});

module.exports = router;