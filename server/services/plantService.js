const { response } = require('express');
const Sensor = require('../models/sensorsModel')
const Plant = require('../models/plantModel')
const Garden = require('../models/gardenModel')
const Photo = require('../models/photoModel');
const { deletePhoto } = require('./photoService');
const { deleteSensor } = require('./sensorService');




const createPlantByAdmin = async(species,irrigationInstructors,optimalTemp,optimalSoilMoisture,optimalSunExposure,description)=>{
    const plant= new Plant({

    species:species,
        irrigationInstructors: irrigationInstructors,
        optimalTemp: optimalTemp,
        optimalSoilMoisture: optimalSoilMoisture,
        optimalSunExposure: optimalSunExposure,
        description :description,
        sensorID:null,
        photos:[],
        GardenID:null,
        growthStatus:null,
        healthStatus:null,
        isUserPlant:false,
        defaultPhotoID:null 
   }); 
   return await plant.save();
};
//(err,adminPlant)=>{
 
const createPlantByUser= async(species,isUserPlant,growthStatus,GardenID)=>{
    
    Plant.findOne({species:species,isUserPlant:false},async(err,adminPlant)=>{
    
     const userPlant= new Plant({
        species:adminPlant.species,
        irrigationInstructors: adminPlant.irrigationInstructors,
        optimalTemp: adminPlant.optimalTemp,
        optimalSoilMoisture: adminPlant.optimalSoilMoisture,
        optimalSunExposure: adminPlant.optimalSunExposure,
        description :adminPlant.description,
        sensorID:null,
        photos:[],
        GardenID:GardenID,
        growthStatus:growthStatus,
        healthStatus:null,
        isUserPlant:true,
        defaultPhotoID:null });

        Garden.findById(GardenID,(err,garden)=>{
            if(garden){
            garden.plants.push(userPlant)
            garden.save()
            }
        })
        return await userPlant.save();})
    

};



const getPlantById = async(id)=>{return await Plant.findById(id)};

const getPlantsByGardenId = async(gardenId)=>{
       return await Plant.find({GardenID:gardenId}); 
};

const getAllPlants = async()=>{return await Plant.find({})
};

const getAllAdminPlants = async()=>{return await Plant.find({isUserPlant:false})
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

const deletePlant= async(plantID,gardenID)=> {
    const plant = await getPlantById(plantID);

    if (!plant)
        return null;

    else{
        //deleting photos
        if (plant.photos.length>0)
        {
            for (let i=0; i<plant.photos.length ; i++)
            {   
                 deletePhoto(plant.photos[i])
            }
        }
        //deleting ref plant from garden
        Garden.findById(gardenID,(err,garden)=>{
            var removeIndex;
            if(garden.plants.length){
                 for(let i=0;i<garden.plants.length;i++)
                     if(garden.plants[i]==plantID)
                         removeIndex=i
                garden.plants.splice(removeIndex,1)
                 garden.save()    
            }
        })
        deleteSensor(plant.sensorID);
        await plant.remove();
    }
    return plant;
};

module.exports={getPlantsByGardenId, createPlantByAdmin, createPlantByUser, updatePlant, getPlantById, deletePlant, getAllPlants,getAllAdminPlants };