const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// LOGIN VALIDATION PROCESS W/ PASSPORT
// (http://www.passportjs.org/docs/configure/)
module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // match user email to existing
            User.findOne({ email: email })
                .then(user => {
                    // validate email
                    if (!user) {
                        return done(null, false, { message: 'Email not registered' });
                    }
                    // validate password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password is incorrect.' });
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    // reference documentation
    // auth credentials will only be transmitted during login request
    // if authentication succeeds, a session will be established via a cookie
    // cookie used for serialize/deserialize in subsequent requests
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}


