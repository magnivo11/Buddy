const { request, response } = require('express');
const { findByIdAndUpdate, findOneAndUpdate } = require('../models/plantModel');
const Plant=require('../models/plantModel');
const plantService = require('../services/plantService'); 

  
const createPlantByUser= (request,repsonse)=>{

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
        response.send('new plant was created');  
    
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

module.exports={createPlantByAdmin, createPlantByUser, updatePlant, getPlantById, deletePlant, getAllPlants};
