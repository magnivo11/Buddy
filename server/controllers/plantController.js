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
    const plant= await plantService.deletePlant(request.body.plantID,request.body.gardenID);
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

const plantsPopularity = async (request,response)=>{
    const pop = await plantService.plantsPopularity();
     response.json(pop);
}

const updatePlantByAdmin =async (request,response)=>{
     const plant= await plantService.updatePlantByAdmin(
        request.body.id,
        request.body.species,
        request.body.irrigationInstructors,
        request.body.optimalTemp,
        request.body.optimalSoilMoisture,
        request.body.optimalSunExposure,
        request.body.description,
        request.body.defaultPhotoID);
        if (!plant){
        return response.status(404).json({errors:['Plant not found']});}
    response.json(plant); 
};

const getPlantByName =async (request,response)=>{
    const plants = await plantService.getPlantByName(request.params.species);
    if(!plants)
    return response.status(404).json({errors:['plants not found']});
    response.json(plants);
  };

const updatePlantByUser =async (request,response)=>{
    const plant= await plantService.updatePlantByUser(
        request.body.id,
        request.body.species,
        request.body.growthStatus);
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

module.exports={getPlantsByGardenId,plantsPopularity,getPlantByName, createPlantByAdmin, createPlantByUser, 
    updatePlantByAdmin,updatePlantByUser, getPlantById, deletePlant, getAllPlants, getAllAdminPlants};