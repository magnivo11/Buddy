//import express
const express=require('express');
var router= express.Router();
//import mongoose
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const coneectionString='mongodb+srv://Nivo11:sheleg11@cluster0.k9bri.mongodb.net/Buddy_db?retryWrites=true&w=majority';
mongoose.connect(coneectionString,{ useUnifiedTopology: true, useNewUrlParser: true  });
const plantController = require('../controllers/plantController');



router.get('/',plantController.getAllPlants);

router.get('/admin',plantController.getAllAdminPlants);


router.post('/',plantController.createPlantByAdmin)

router.post('/ByUser',plantController.createPlantByUser);

router.get('/:id',plantController.getPlantById);

router.patch('/:id',plantController.updatePlant);

router.delete('/:id ',plantController.deletePlant);







module.exports=router;