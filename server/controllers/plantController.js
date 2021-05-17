const { request, response } = require('express');
const { findByIdAndUpdate, findOneAndUpdate } = require('../models/plantModel');
const Plant=require('../models/plantModel');
const plantService = require('../services/plantService'); 

var emitter = require('../common/emitter');
var myEmitter = emitter.myEmitter;

const createPlantByUser= async(request,repsonse)=>{

    const newPlant=  
        await plantService.createPlantByUser(  
        request.body.species,
        request.body.isUserPlant,
        request.body.growthStatus,
        request.body.GardenID
        );
    myEmitter.emit('createPlant');
};



const createPlantByAdmin= async(request,response)=>{
    // const newPlant=  
    // await plantService.createPlantByAdmin(  
    //     request.body.species,
    //     request.body.irrigationInstructors,
    //     request.body.optimalTemp,
    //     request.body.optimalSoilMoisture,
    //     request.body.optimalSunExposure,
    //     request.body.descriptio
    //     )


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
     await plant.save((err,plant)=>{
        if(err){
        response.send(err)
        }
        else{
            myEmitter.emit('createPlant');
            response.send(plant)
        }
    });
    };
   


const deletePlantUser = async(request,response)=>{
    const plant= await plantService.deletePlantUser(request.body.plantID,request.body.gardenID);

    if (!plant){
    return response.status(404).json({errors:['Plant not found']});}

    myEmitter.emit('deletePlant');
    response.send();
}

const getPlantById = async(request,response)=>{
    const plant= await plantService.getPlantById(request.params.id)
    if (!plant)
     return response.status(404).json({errors:['Plant not found']});
    response.json(plant);
};

const getPlantsByGardenId = async (request,response)=>{
     const plants = await plantService.getPlantsByGardenId(request.params.gardenId);
    response.json(plants); 
}

const getNumOfPlants = async (request,response)=>{
    const count = await plantService.getNumOfPlants();
   response.json(count); 
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
    return response.status(404).json({errors:['Plant not found']});
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

const deletePlantAdmin = async(request,response)=>{
    const plant= await plantService.deletePlantAdmin(request.body.plantID);
    
    if (!plant){
    return response.status(404).json({errors:['Plant not found']});}

    myEmitter.emit('deletePlant');
    response.send();
};

const getPlantsByKeyWord = async (request, response) => {
    const plants = await plantService.getPlantsByKeyWord(request.params.key)
    if (!plants)
        return response.status(404).json({ errors: ['Plants not found'] });
    response.json(plants);
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
    getNumOfPlants,
    getPlantsByKeyWord
};
 