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



router.get('/byemail/:email',userController.getUserByEmail); 

router.get('/:id',userController.getUserById); 

router.get('/',userController.getUsers); 
              
router.post('/', userController.createUser);

router.put('/',userController.updateUser);

router.delete('/',userController.deleteUser);


module.exports=router;