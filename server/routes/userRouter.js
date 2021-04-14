//import express
const { resolveForwardRef } = require('@angular/compiler/src/util');
const express = require('express');
var router = express.Router();
//import mongoose
const mongoose = require('mongoose');
const passport = require('passport');
const { toast } = require('react-toastify');
const Schema = mongoose.Schema;
// import custom env - who helps us to use enviroment varibles 
require('custom-env').env(process.env.NODE_ENV, './config');
mongoose.connect(process.env.CONNECTION_STRING, { useUnifiedTopology: true, useNewUrlParser: true });
// import controllers   
const userController = require('../controllers/userController');


router.get('/logout', isValidUser, function (req, res, next) {
    req.logout();
    return res.status(200).json({ message: 'Logout Success' });
})


router.get('/home', isValidUser, function (req, res, next) {
    return res.status(200).json(req.user);
});

router.get('/byemail/:email', userController.getUserByEmail);

router.get('/groupedbyadmin', userController.getUsersGroupedByAdmin);

router.get('/:id', userController.getUserById);

router.get('/', userController.getUsers);

router.post('/', userController.createUser);

router.put('/', userController.updateUser);

router.delete('/', userController.deleteUser);

router.post('/register', userController.createUser);

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.status(501).json(err)
        }
        if (!user) {
            return res.status(501).json(info);
        }
        req.logIn(user, function (err) {
            if (err) { return res.status(501).json(err) }
            return res.status(200).json({ message: 'Login Success' });
        });
    })(req, res, next);
});



function isValidUser(req, res, next) {
    if (req.isAuthenticated()) next();
    else return res.status(401).json({ message: 'Unauthorized Request' });
}


module.exports = router;