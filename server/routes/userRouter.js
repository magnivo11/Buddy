//import express
const express=require('express');
var router= express.Router();
//import mongoose
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const coneectionString='mongodb+srv://Nivo11:sheleg11@cluster0.k9bri.mongodb.net/Buddy_db?retryWrites=true&w=majority';
mongoose.connect(coneectionString,{ useUnifiedTopology: true, useNewUrlParser: true  });
// import controllers 
const gardenController = require('../controllers/gardenController');  
const photoController = require('../controllers/photoController'); 
const plantController = require('../controllers/plantController');  
const sensorsController = require('../controllers/sensorsController');  
const userController = require('../controllers/userController');  


//read / get user by email
router.get('/:email',userController.getUserByEmail); 

//create user
// request must include:
// name:request.body.firstName,
// lastName:request.body.lastName,
// email:request.body.email,
// password:request.body.password,               
router.post('/', userController.createUser);


//update user details
//request must include 
// name:request.body.firstName,
// lastName:request.body.lastName,
// email:request.body.email,
// password:request.body.password,
router.put('/',userController.updateUser);

// delete user
//request must include 
// _id:request.body.email
router.delete('/',userController.deleteUser);

module.exports=router;