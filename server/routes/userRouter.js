//import express
const express=require('express');
var router= express.Router();
//import mongoose
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
// import custom env - who helps us to use enviroment varibles 
require('custom-env').env(process.env.NODE_ENV,'./config'); 
mongoose.connect(process.env.CONNECTION_STRING,{ useUnifiedTopology: true, useNewUrlParser: true  });
// import controllers   
const userController = require('../controllers/userController');  


//read / get user by email
router.get('/:email',userController.getUserByEmail); 


router.get('/',userController.getUsers); 

//create user
// request must include:
// name:request.body.firstName,
// lastName:request.body.lastName,
// email:request.body.email,
// password:request.body.password,               
router.post('/', userController.createUser);


//update user details
//request must include 
// _id:request.body._id
// name:request.body.firstName,
// lastName:request.body.lastName,
// email:request.body.email,
// password:request.body.password,
router.put('/',userController.updateUser);

// delete user
//request must include 
// _id:request.body._id
router.delete('/',userController.deleteUser);

//add a garden

router.put('/addGarden',userController.addGarden)

module.exports=router;