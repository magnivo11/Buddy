const { response } = require('express');
const Sensor = require('../models/sensorsModel')
const Plant = require('../models/plantModel')
const Garden = require('../models/gardenModel')
const Photo = require('../models/photoModel');
const { deletePhoto } = require('./photoService');
const { deleteSensor } = require('./sensorService');
const multer = require("multer");
require('dotenv').config();
const path = require('path');

const createPlantByAdmin = async (species, irrigationInstructors, optimalTemp, optimalSoilMoisture, optimalSunExposure, description) => {

    const plant = new Plant({

        species: species,
        irrigationInstructors: irrigationInstructors,
        optimalTemp: optimalTemp,
        optimalSoilMoisture: optimalSoilMoisture,
        optimalSunExposure: optimalSunExposure,
        description: description,
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
            return err.message
        }
        else
            return plant
    });
};

const createPlantByUser = async (species, isUserPlant, growthStatus, GardenID) => {

    await Plant.findOne({ species: species, isUserPlant: false }, async (err, adminPlant) => {

        const userPlant = await new Plant({
            species: adminPlant.species,
            irrigationInstructors: adminPlant.irrigationInstructors,
            optimalTemp: adminPlant.optimalTemp,
            optimalSoilMoisture: adminPlant.optimalSoilMoisture,
            optimalSunExposure: adminPlant.optimalSunExposure,
            description: adminPlant.description,
            sensorID: null,
            photos: [],
            GardenID: GardenID,
            growthStatus: growthStatus,
            healthStatus: null,
            tempStatus: null,
            lightStatus: null,
            moistStatus: null,
            isUserPlant: true,
            defaultPhotoID: null
        });


        await Garden.findById(GardenID, (err, garden) => {
            if (garden) {
                garden.plants.push(userPlant)
                garden.save()
            }
        })
        return await userPlant.save();
    })


};

const getNumOfAdminPlants = async () => {
    return await Plant.countDocuments({isUserPlant: false});
};

const getNumOfUserPlants = async () => {
    return await Plant.countDocuments({isUserPlant: true});
};

const getPhotos = async (id) => {
    return await Plant.findById(id).populate('photos');
};


const getPlantById = async (id) => { return await Plant.findById(id) };

const getPlantsByGardenId = async (gardenId) => {
    return await Plant.find({ GardenID: gardenId });
};


const getPlantByName = async (name) => {
    return await
        Plant.find({
            isUserPlant: false, species: {
                $regex: `.*${name}.*`
            }
        });
};



const getAllPlants = async () => {
    return await Plant.find({})
};

const getAllAdminPlants = async () => {
    return await Plant.find({ isUserPlant: false })
};

const getAllUsersPlants = async () => {
    return await Plant.find({ isUserPlant: true })
};

const updatePlantByUser = async (id, species = null, growthStatus = null, GardenID) => {

    Plant.findById(id, (err, plant) => {
        if (species != null) {
            plant.species = species
        }
        if (growthStatus != null) {
            plant.growthStatus = growthStatus
        }
        plant.GardenID = GardenID;
        plant.updatedDate = Date.now();
        plant.save();
    })
    return true;
};


const updatePlantByAdmin = async (id,
    species = null, irrigationInstructors = null, optimalTemp = null,
    optimalSoilMoisture = null, optimalSunExposure = null, description = null, defaultPhotoID = null) => {
    Plant.findById(id, (err, plant) => {
        if (species != null) {
            plant.species = species
        }
        if (irrigationInstructors != null) {
            plant.irrigationInstructors = irrigationInstructors
        }
        if (optimalTemp != null) {
            plant.optimalTemp = optimalTemp
        }
        if (optimalSoilMoisture != null) {
            plant.optimalSoilMoisture = optimalSoilMoisture
        }
        if (optimalSunExposure != null) {
            plant.optimalSunExposure = optimalSunExposure
        }
        if (description != null) {
            plant.description = description
        }
        if (defaultPhotoID != null) {
            plant.defaultPhotoID = defaultPhotoID
        }
        plant.lastUpdated = Date.now();
        plant.save();
    })
    return true;
};


const plantsPopularity = async () => {
    const allPlants = await getAllPlants();
    var max = 0;
    var name = 'none';
    const plantsSpecies = allPlants.map(plant => plant.species)
    plantsSpecies.reduce((a, b) => {
        a[b] = a[b] + 1 || 1;
        if (max < a[b]) {
            max = a[b]
            name = b
        }
        return a;
    }, {})
    return name;
}

const deletePlantUser = async (plantID, gardenID) => {
    const plant = await getPlantById(plantID);

    if (!plant)
        return null;

    else {
        //deleting photos
        if (plant.photos.length > 0) {
            for (let i = 0; i < plant.photos.length; i++) {
                deletePhoto(plant.photos[i])
            }
        }
        //deleting ref plant from garden
        Garden.findById(gardenID, (err, garden) => {
            var removeIndex;
            if (garden.plants.length > 0) {
                for (let i = 0; i < garden.plants.length; i++)
                    if (garden.plants[i] == plantID)
                        removeIndex = i
                garden.plants.splice(removeIndex, 1)
                garden.save()
            }
        })
        deleteSensor(plant.sensorID);
        await plant.remove();
    }
    return plant;
};

const deletePlantAdmin = async (plantID) => {
    const plant = await getPlantById(plantID);
    if (!plant)
        return null;
    else
        await plant.remove();
    return true;
};

const getAdminPlantsByKeyWord = async (string) => {

    if (!string) {
        string = "";
    }

    return await Plant.aggregate([
        {
            $match: {
                $or: [
                    { species: { $regex: string, $options: 'i' } },
                    { growthStatus: { $regex: string, $options: 'i' } },
                    { irrigationInstructors: { $regex: string, $options: 'i' } },
                    { description: { $regex: string, $options: 'i' } }
                ],
                $and: [{isUserPlant: false}]
            }
        }
    ]);
};

const getUserPlantsByKeyWord = async (string) => {

    if (!string) {
        string = "";
    }

    return await Plant.aggregate([
        {
            $match: {
                $or: [
                    { species: { $regex: string, $options: 'i' } },
                    { growthStatus: { $regex: string, $options: 'i' } },
                    { irrigationInstructors: { $regex: string, $options: 'i' } },
                    { description: { $regex: string, $options: 'i' } }
                ],
                $and: [{isUserPlant: true}]
            }
        }
    ]);
};

const getSumOfPlantsByGarden = async () => {
    return await Plant.aggregate([
        {
            $match: {
                isUserPlant: true
            }
        },
        {
        $group: {
            _id: "$GardenID",
            count: { $sum: 1 }
        }
        }
    ]);
}; 

module.exports = {
    getPlantsByGardenId,
    getPlantByName,
    createPlantByAdmin,
    createPlantByUser,
    plantsPopularity,
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
