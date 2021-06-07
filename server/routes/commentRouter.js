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
const commentController = require('../controllers/commentController');  

router.get('/filter/:key', commentController.getCommentsByKeyWord);

router.get('/postComments',commentController.getSumOfCommentsByPost); 
router.get('/:id',commentController.getCommentById); 

router.get('/bypost/:postID',commentController.getAllCommentsByPost); 
router.get('/byUser/:userID',commentController.getAllCommentsByUser); 

router.get('/',commentController.getAllComments); 

router.post('/',commentController.createComment);

router.put('/',commentController.updateComment);

router.delete('/',commentController.deleteComment);


module.exports=router;