//import express
const express=require('express');
var router= express.Router();
//import mongoose
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
require('custom-env').env(process.env.NODE_ENV,'./config'); 
mongoose.connect(process.env.CONNECTION_STRING,{ useUnifiedTopology: true, useNewUrlParser: true  });
const plantController = require('../controllers/plantController');



router.get('/',plantController.getAllPlants); //good

router.get('/admin',plantController.getAllAdminPlants);//good

router.get('/byGarden/:gardenId', plantController.getPlantsByGardenId);

router.post('/',plantController.createPlantByAdmin)

router.post('/ByUser',plantController.createPlantByUser);

router.get('/:id',plantController.getPlantById);

router.put('/byuser/',plantController.updatePlantByUser);

router.put('/byAdmin/',plantController.updatePlantByAdmin);

router.get('/admin/byName/:species',plantController.getPlantByName);

router.delete('/',plantController.deletePlantUser);

router.delete('/byAdmin/',plantController.deletePlantAdmin);

router.get('/popularity/all',plantController.plantsPopularity);





module.exports=router;