const { request, response } = require('express');
const { findByIdAndUpdate, findOneAndUpdate } = require('../models/plantModel');
const Plant=require('../models/plantModel');
const plantService = require('../services/plantService'); 
const express = require("express");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const app = express();
const Photo = mongoose.model("photos");
const router = express.Router();

var emitter = require('../common/emitter');
var myEmitter = emitter.myEmitter;

const createPlantByUser= async(request,response)=>{

    const newPlant=  
        await plantService.createPlantByUser(  
        request.body.species,
        request.body.isUserPlant,
        request.body.growthStatus,
        request.body.GardenID
        );
    myEmitter.emit('createUserPlant');
    response.status(200).send(newPlant)

};

const createPlantByAdmin = async (request, response) => {



    const plant = new Plant({

        species: request.body.species,
        irrigationInstructors: request.body.irrigationInstructors,
        optimalTemp: request.body.optimalTemp,
        optimalSoilMoisture: request.body.optimalSoilMoisture,
        optimalSunExposure: request.body.optimalSunExposure,
        description: request.body.description,
        sensorID: null,
        photos: [],
        GardenID: null,
        growthStatus: null,
        healthStatus: null,
        tempStatus: null,
        lightStatus: null,
        moistStatus: null,
        isUserPlant: false,
        defaultPhotoID: null
    });
    await plant.save((err, plant) => {
        if (err) {
            response.status(404).send(err)
        }
        else{
            myEmitter.emit('createAdminPlant');
            response.status(200).send(plant)
        }
    });
};

const deletePlantUser = async(request,response)=>{
    const plant= await plantService.deletePlantUser(request.body.plantID,request.body.gardenID);

    if (!plant){
    return response.status(404).json({errors:['Plant not found']});}

    myEmitter.emit('deleteUserPlant');
    response.status(200).send();
}

const getPlantById = async (request, response) => {
    const plant = await plantService.getPlantById(request.params.id)
    if (!plant)
        return response.status(404).json({ errors: ['Plant not found'] });
    response.status(200).json(plant);
};

const getPlantsByGardenId = async (request,response)=>{
     const plants = await plantService.getPlantsByGardenId(request.params.gardenId);
    response.status(200).json(plants); 
}

const getNumOfAdminPlants = async (request,response)=>{
    const count = await plantService.getNumOfAdminPlants();
   response.status(200).json(count); 
}

const getNumOfUserPlants = async (request,response)=>{
    const count = await plantService.getNumOfUserPlants();
   response.status(200).json(count); 
}

const getPhotos = async (req,res)=>{
      const plantphotos = await plantService.getPhotos(req.params.id);
      res.status(200).json(plantphotos.photos); 
  
}

const plantsPopularity = async (request, response) => {
    const pop = await plantService.plantsPopularity();
    response.status(200).json(pop);
}

const updatePlantByAdmin = async (request, response) => {
    const plant = await plantService.updatePlantByAdmin(
        request.body._id,
        request.body.species,
        request.body.irrigationInstructors,
        request.body.optimalTemp,
        request.body.optimalSoilMoisture,
        request.body.optimalSunExposure,
        request.body.description,
        request.body.defaultPhotoID);
    if (!plant) {
        return response.status(404).json({ errors: ['Plant not found'] });
    }
    response.status(200).json(plant);
};

const getPlantByName = async (request, response) => {
    const plants = await plantService.getPlantByName(request.params.species);
    if (!plants)
        return response.status(404).json({ errors: ['Plant not found'] });
    response.status(200).json(plants);
};

const updatePlantByUser = async (request, response) => {
    const plant = await plantService.updatePlantByUser(
        request.body._id,
        request.body.species,
        request.body.growthStatus,
        request.body.GardenID);
    if (!plant) {
        return response.status(404).json({ errors: ['Plant not found'] });
    }
    response.status(200).json(plant);
};

const getAllPlants = async (request, response) => {
    const plants = await plantService.getAllPlants();
    response.status(200).json(plants);
};


const getAllAdminPlants = async (request, response) => {
    const plants = await plantService.getAllAdminPlants();
    response.status(200).json(plants);
};

const getAllUsersPlants = async (request, response) => {
    const plants = await plantService.getAllUsersPlants();
    response.status(200).json(plants);
};

const deletePlantAdmin = async(request,response)=>{
    const plant= await plantService.deletePlantAdmin(request.body.plantID);
    
    if (!plant){
    return response.status(404).json({errors:['Plant not found']});
    }

    myEmitter.emit('deleteAdminPlant');
    return response.status(200).json(plant);
};

const getAdminPlantsByKeyWord = async (request, response) => {
    const plants = await plantService.getAdminPlantsByKeyWord(request.params.key)
    if (!plants)
        return response.status(404).json({ errors: ['Plants not found'] });
    response.status(200).json(plants);
};

const getUserPlantsByKeyWord = async (request, response) => {
    const plants = await plantService.getUserPlantsByKeyWord(request.params.key)
    if (!plants)
        return response.status(404).json({ errors: ['Plants not found'] });
    response.status(200).json(plants);
};

const getSumOfPlantsByGarden = async (req, res) => {
    const plants = await plantService.getSumOfPlantsByGarden();
    if (!plants)
        return response.status(404).json({ errors: ['Plants not found'] });
    res.status(200).json(plants);
};

module.exports={
    getPlantsByGardenId,
    plantsPopularity,
    getPlantByName, 
    createPlantByAdmin, 
    createPlantByUser, 
    updatePlantByAdmin,
    updatePlantByUser, 
    getPlantById, 
    deletePlantUser,
    deletePlantAdmin, 
    getAllPlants, 
    getAllAdminPlants,
    getNumOfAdminPlants,
    getNumOfUserPlants,
    getAdminPlantsByKeyWord,
    getUserPlantsByKeyWord,
    getSumOfPlantsByGarden,
    getPhotos,
    getAllUsersPlants
};
