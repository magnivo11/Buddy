const { response } = require('express');
const Sensor = require('../models/sensorsModel')
const Plant = require('../models/plantModel')
const Garden = require('../models/gardenModel')




const createPlantByAdmin = async(species,irrigationInstructors,optimalTemp,optimalSoilMoisture,optimalSunExposure,description)=>{
    const plant= new Plant({

    species:species,
        irrigationInstructors: irrigationInstructors,
        optimalTemp: optimalTemp,
        optimalSoilMoisture: optimalSoilMoisture,
        optimalSunExposure: optimalSunExposure,
        description :description,
        sensorID:null,
        photos:null,
        GardenID:null,
        growthStatus:null,
        healthStatus:null,
        isUserPlant:false,
        defaultPhotoID:null 
   }); 
   return await plant.save();
};

const createPlantByUser= async()=>{};
 

const getPlantById = async(id)=>{return await Plant.findById(id)};

const getAllPlants = async()=>{return await Plant.find({})
};

const updatePlant = async(id,
    species = null,irrigationInstructors=null,optimalTemp=null,
    optimalSoilMoisture=null,optimalSunExposure=null,description=null)=>{
    
    const plant= Plant.getUserById(id);
    if (!plant)
        return null;
    else
    {
        if (species!=null){
        plant.species=species}
        if (irrigationInstructors!=null){
        plant.irrigationInstructors=irrigationInstructors}
        if (optimalTemp!=null){
        plant.optimalTemp=optimalTemp}
        if (optimalSoilMoisture!=null){
        plant.optimalSoilMoisture= optimalSoilMoisture}
        if (optimalSunExposure!=null){
        plant.optimalSunExposure= optimalSunExposure}
        if (description!=null){
        plant.description =description}
    }
    await plant.save;
    return plant
    };

const deletePlant= async(id)=> {
    const plant = Plant.getUserById(id);
    if (!plant)
        return null;

    else
        await plant.remove();
    return plant;
};


module.exports={createPlantByAdmin, createPlantByUser, updatePlant, getPlantById, deletePlant, getAllPlants};
