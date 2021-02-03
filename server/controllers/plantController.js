const { request, response } = require('express');
const { findByIdAndUpdate, findOneAndUpdate } = require('../models/plantModel');
const Plant=require('../models/plantModel');
const plantService = require('../services/plantService'); 

  
const createPlantByUser= async(request,repsonse)=>{
    const newPlant=  
    await plantService.createPlantByUser(  
        request.body.species,
        request.body.isUserPlant,
        request.body.growthStatus,
        request.body.GardenID
        )
        response.json(newPlant);
    
    };


const createPlantByAdmin= async(request,response)=>{
    const newPlant=  
    await plantService.createPlantByAdmin(  
        request.body.species,
        request.body.irrigationInstructors,
        request.body.optimalTemp,
        request.body.optimalSoilMoisture,
        request.body.optimalSunExposure,
        request.body.description
        )
        response.json(newPlant);
    
    };
   


const deletePlant = async(request,response)=>{
    const plant= await userService.deletePlant(request.body.id);
    
    if (!plant){
    return response.status(404).json({errors:['User not found']});}
response.send();
}
const getPlantById = async(request,response)=>{
    const plant= await plantService.getPlantById(request.params.id)
    if (!plant)
     return response.status(404).json({errors:['Plant not found']});
    response.json(plant);
};

const getPlantsByGardenId = async (request,response)=>{
     const gardens = await plantService.getPlantsByGardenId(request.params.gardenId);
    response.json(gardens); 
}


const updatePlant =async (request,response)=>{
    const plant= await plantService.updatePlant(
        request.body._id,
        request.body.species,
        request.body.irrigationInstructors,
        request.body.optimalTemp,
        request.body.optimalSoilMoisture,
        request.body.optimalSunExposure,
        request.body.description);
       
        
    
        if (!plant){
        return response.status(404).json({errors:['Plant not found']});}
    response.json(plant); 
};

const getAllPlants=async(request,response)=>{
    const plants = await plantService.getAllPlants();
    response.json(plants);
};


const getAllAdminPlants=async(request,response)=>{
    const plants = await plantService.getAllAdminPlants();
    response.json(plants);
};
const addSensor= async(request,response)=>{
    const plant= await plantService.addSensor(
        request.body.id,
        request.body.sensorID);
    response.json(plant);
}
module.exports={getPlantsByGardenId, createPlantByAdmin, createPlantByUser, updatePlant, getPlantById, deletePlant, getAllPlants, getAllAdminPlants, addSensor};