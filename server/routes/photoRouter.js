//import express
const express = require('express');
var router = express.Router();
//import mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('custom-env').env(process.env.NODE_ENV, './config');
mongoose.connect(process.env.CONNECTION_STRING, { useUnifiedTopology: true, useNewUrlParser: true });
const Photo = require('../models/photoModel');
const Plant = require('../models/plantModel');
const photoController = require('../controllers/photoController');
const { request } = require('express');
const multer = require("multer");
const fs = require('fs');
const crypto = require('crypto');

// connect to mongoDB 
const mongoURI = process.env.CONNECTION_STRING
const conn = mongoose.createConnection(mongoURI)
let gfs
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads')
  console.log('Connection Successful')
})


var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var Readable = require('stream').Readable;
var GridFsStorage = require('multer-gridfs-storage');


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

router.post('/upload', upload.single('link'), (req, res) => {
  
  var fileID = req.file.id;
  const ans = photoController.uploadPhoto(req.file.originalname, req.body.type, req.body.ownerID, fileID);
  console.log("ans");
  console.log(ans);
  return fileID;
});
router.get('/find/:fileID', (req, res) => {
  var ObjectID = require('mongodb').ObjectID;

  gfs.collection('uploads').findOne({'_id':new ObjectID(req.params.fileID)} , (err, file) => {
    // Check if file

     if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      })
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/jpg') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename)
      readstream.pipe(res)
    } else {
      res.status(404).json({
        err: 'Not an image',
      })
    }
  })
})


router.post('/', photoController.createPhoto)
router.get('/:photoID', photoController.getPhoto);
router.get('/', photoController.getAllPhotos);
router.put('/edit/:photoID', photoController.editPhoto);
router.delete('/', (req, res) => {
  var ObjectID = require('mongodb').ObjectID;

  gfs.collection('uploads').findOne({ _id: new ObjectID(req.body.photoID) }, function (err, file) {
    if (err) { console.log("error") }
    if (!file) {
      { console.log("no file was found") }
    }
    if (file) {
      gfs.collection('uploads').deleteMany({ filename: req.body.photoID });
      gfs.collection('uploads').deleteMany({ files_id: file._id });
    }
  })
});
router.get('/scrape/:name', photoController.scrapePhoto); //good 

module.exports = router;