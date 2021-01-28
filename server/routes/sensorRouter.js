//import express
const express=require('express');
var router= express.Router();
//import mongoose
const mongoose= require('mongoose');
const coneectionString='mongodb+srv://Nivo11:sheleg11@cluster0.k9bri.mongodb.net/Buddy_db?retryWrites=true&w=majority';
mongoose.connect(coneectionString,{ useUnifiedTopology: true, useNewUrlParser: true  });
const sensorsController = require('../controllers/sensorsController');
const { request } = require('express');




router.get('/',sensorsController.getAllSensors);

router.post('/',sensorsController.createSensor);

router.get('/:id',sensorsController.getSensorById);

router.delete('/:id ',sensorsController.deleteSensor);




module.exports=router; 