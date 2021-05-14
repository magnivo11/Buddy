//import express
const express=require('express');
var router= express.Router();
//import mongoose
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
require('custom-env').env(process.env.NODE_ENV,'./config'); 
mongoose.connect(process.env.CONNECTION_STRING,{ useUnifiedTopology: true, useNewUrlParser: true  });
const Photo=require('../models/photoModel');
const photoController = require('../controllers/photoController');
const { request } = require('express');
const multer = require ("multer");
const fs = require('fs');
  
 
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"../public/uploads");
    },
     filename:(req,file,callback) =>{
        callback(null,file.originalname)
    },

})

const upload = multer({storage:storage});

router.post('/upload', upload.single('link'),(req,res)=>{
 const newPhoto = new Photo({
    link: req.file.originalname,
    name: "img"+Date.now() 
});
});


router.post('/',photoController.createPhoto) // good 
router.get('/:photoID',photoController.getPhoto); //good 
router.get('/',photoController.getAllPhotos);//good 
router.put('/edit/:photoID',photoController.editPhoto);
router.delete('/:photoID', photoController.deletePhoto); 
router.get('/scrape/:name',photoController.scrapePhoto); //good 
 
module.exports=router; 