//import express
const express=require('express');
var router= express.Router();
//import mongoose
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const coneectionString='mongodb+srv://Nivo11:sheleg11@cluster0.k9bri.mongodb.net/Buddy_db?retryWrites=true&w=majority';
mongoose.connect(coneectionString,{ useUnifiedTopology: true, useNewUrlParser: true  });
const Garden=require('../models/gardenModel');
const gardenController = require('../controllers/gardenController');
const { request } = require('express');

router.post('/',gardenController.createGarden)
router.get('/',gardenController.getAllGardens)
// get gardens by userID
 router.get('/:userID', gardenController.getGardensByUserId); 
 //router.get('/:gardenID', gardenController.getGardenById); 



module.exports=router; 