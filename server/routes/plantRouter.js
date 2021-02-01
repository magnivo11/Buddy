//import express
const express=require('express');
var router= express.Router();
//import mongoose
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
require('custom-env').env(process.env.NODE_ENV,'./config'); 
mongoose.connect(process.env.CONNECTION_STRING,{ useUnifiedTopology: true, useNewUrlParser: true  });
const plantController = require('../controllers/plantController');



router.get('/',plantController.getAllPlants); 

router.get('/admin',plantController.getAllAdminPlants);

router.get('/:gardenId', plantController.getPlantsByGardenId);


router.post('/',plantController.createPlantByAdmin)

router.post('/ByUser',plantController.createPlantByUser);

router.get('/:id',plantController.getPlantById);

router.patch('/:id',plantController.updatePlant);

router.delete('/:id ',plantController.deletePlant);







module.exports=router;