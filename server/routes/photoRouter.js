//import express
const express = require('express');
var router = express.Router();
//import mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('custom-env').env(process.env.NODE_ENV, './config');
mongoose.connect(process.env.CONNECTION_STRING, { useUnifiedTopology: true, useNewUrlParser: true });
const Photo = require('../models/photoModel');
const photoController = require('../controllers/photoController');
const { request } = require('express');
const multer = require("multer");
const fs = require('fs');
const crypto =  require ('crypto');


 var Grid = require('gridfs-stream');
// Grid.mongo = mongoose.mongo;
var Readable = require('stream').Readable;
var GridFsStorage = require('multer-gridfs-storage');

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "public/uploads");
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname)
//     },

// })

// const upload = multer({ storage: storage });


// Create storage engine
const storage = new GridFsStorage({
    url: process.env.CONNECTION_STRING,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err)
          }
          const filename = file.originalname
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
          }
          resolve(fileInfo)
        })
      })
    },
  })
  
  const upload = multer({ storage })


router.post('/upload', upload.single('link'), (req, res,err) => {
    if (err) throw err
    res.status(201).send()
//  var newPhoto= new Photo();
//  newPhoto.img.data = fs.readFileSync(req.files.userPhoto.path)
//  newPhoto.img.contentType = 'image/png';
//  newPhoto.save();
    // const type = req.body.type; 
    // const plantID = req.body.plantID;
    // photoController.uploadPhoto(req.file.originalname, "img" + Date.now(), type,plantID)
});


router.post('/', photoController.createPhoto) // good 
router.get('/:photoID', photoController.getPhoto); //good 
router.get('/', photoController.getAllPhotos);//good 
router.put('/edit/:photoID', photoController.editPhoto);
router.delete('/:photoID', photoController.deletePhoto);
router.get('/scrape/:name', photoController.scrapePhoto); //good 

module.exports = router;