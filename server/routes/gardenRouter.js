//import express
const express=require('express');
var router= express.Router();
//import mongoose
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
require('custom-env').env(process.env.NODE_ENV,'./config'); 
mongoose.connect(process.env.CONNECTION_STRING,{ useUnifiedTopology: true, useNewUrlParser: true  });
const Garden=require('../models/gardenModel');
const gardenController = require('../controllers/gardenController');
const { request } = require('express');

router.post('/',gardenController.createGarden) // good
router.get('/',gardenController.getAllGardens) // good 
router.put('/',gardenController.editGarden);
router.get('/find/:gardenID', gardenController.getGardenById); // good 
router.get('/:userID', gardenController.getGardensByUserId);  // good 
router.delete('/',gardenController.deleteGarden); 
router.delete('/:gardenID'/':plantID',gardenController.deletePlantInGarden); 



module.exports=router; 