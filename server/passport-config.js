//passport imports
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
const User = require('./models/userModel');



// Configuring Passport

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (username, password, done) {
         User.findOne({ email: username }, function (err, user) {
             if (err) { return done(err); }
            if (!user) { return done(null, false); }
             if (!user.isValid(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

 
