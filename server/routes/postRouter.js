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
const postController = require('../controllers/postController');  


router.get('/count',postController.getNumOfPosts); 
router.get('/:id',postController.getPostById); 

router.get('/',postController.getAllPosts); 
router.get('/filter/:key',postController.getPostsByKeyWord); 

router.post('/',postController.createPost);

router.put('/',postController.updatePost);

router.delete('/',postController.deletePost);

router.get('/user/:id',postController.getPostsByUser); 

module.exports=router;