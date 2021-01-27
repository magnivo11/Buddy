const { request, response } = require('express');
const { findByIdAndUpdate, findOneAndUpdate } = require('../models/plantModel');
const Plant=require('../models/plantModel');
  

const createPlantByAdmin= (request,response)=>{

    var newPlant= new Plant({
        species:request.body.species,
        irrigationInstructors: request.body.irrigationInstructors,
        optimalTemp: request.body.optimalTemp,
        optimalSoilMoisture: request.body.optimalSoilMoisture,
        optimalSunExposure: request.body.optimalSunExposure,
        description :request.body.description,
        status:null,
        sensorID:null,
        photos:null,
        GardenID:null,
        growthStatus:null,
        healthStatus:null,
        isUserPlant:false,
        defaultPhotoID:null 

    })
    newPlant.save((err,plant)=>{
        if(err){
        response.send(err)}
        else{
        response.send(plant)}
    })
}

const deletePlant = (request,response)=>{
    Plant.deleteOne({_id:request.body._id})
}
const getPlantById = (request,response)=>{
    Plant.findOne({_id:request.params._id},(err,user)=>{
       if(err)
       {
       response.send(err)}
       else{
       response.send(user)}
   })
};

const updatePlant = (request,response)=>{
    const PlantUpdate={
        species:request.body.species,
        irrigationInstructors: request.body.irrigationInstructors,
        optimalTemp: request.body.optimalTemp,
        optimalSoilMoisture: request.body.optimalSoilMoisture,
        optimalSunExposure: request.body.optimalSunExposure,
        description :request.body.description,
        status:request.body.status,
        sensorID:request.body.sensorID,
        photos:request.body.photos,
        GardenID:request.body.GardenID
        }
        
   User.findOneAndUpdate({_id:request.body._id},plantUpdate,(err,user)=>{
       if(err){
       response.send(err);}
       else{
       response.send('plant updated successfully');}
   }); 
}

module.exports={createPlantByAdmin, updatePlant, getPlantById, deletePlant};
