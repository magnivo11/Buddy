const { request, response } = require('express');
const Garden=require('../models/gardenModel')
const gardenService = require('../services/gardenService'); 


const createGarden=async (request,response)=>{
    const newGarden=  await gardenService.createGarden(  
        request.body.name,
        request.body.direction,
        request.body.directSun,
        request.body.surroundings,
        request.body.userID,
        );
        response.json(newGarden);    
}

   
const getAllGardens= async (request,response)=>{
    const gardens = await gardenService.getAllGardens(); 
    response.json(gardens);
}

const getGardenById= async (request,response)=>{
    const garden = await gardenService.getGardenById(request.params.gardenID);
    response.json(garden);
}

const getGardensByUserId = async (request,response)=>{
    const gardens = await gardenService.getGardensByUserId(request.params.userID);
    response.json(gardens); 
}

const editGarden = async (request,response)=>{
    const garden = await gardenService.editGarden(
        request.body._id,
        request.body.name,
        request.body.direction,
        request.body.surrounding,
        request.body.directSun,
        request.body.userID);

    if(garden)
    {
        
        return response.status(200).json('garden was updated');  
    }
    response.status(404).json({ errors: ['garden wasnt updated'] }); 
}

const deleteGarden = async (request,response)=>{
    const garden = await gardenService.deleteGarden(request.body.gardenID,request.body.userID);
    if(garden==true)
    {
        return response.status(200).json('garden was deleted');  
    }
    response.status(404).json({ errors: ['garden wasnt deleted'] }); 
}

const deletePlantInGarden = async (request,response)=>{
    const deletePlant = await gardenService.deletePlantInGarden(request.params.gardenID,request.params.plantID);
    if(deletePlant==true)
    {
        response.send('plant was deleted'); 
    } 
}

const getAllSelectedGardens= async (request,response)=>{

    const gardens = await gardenService.getAllSelectedGardens(
        request.params.direction,
        request.params.directSun,
        request.params.surrounding); 
    response.json(gardens);          
};
                      
const getGardensByKeyWord = async (request, response) => {
    const gardens = await gardenService.getGardensByKeyWord(request.params.key)
    if (!gardens)
        return response.status(404).json({ errors: ['Gardens not found'] });
    response.json(gardens);
};

const getNumOfGardens = async (request,response)=>{
    const count = await gardenService.getNumOfGardens();
   response.json(count); 
};

module.exports={
    createGarden,
    deletePlantInGarden,
    deleteGarden,
    getAllGardens,
    getGardenById,
    editGarden,
    getGardensByUserId,
    getAllSelectedGardens,
    getGardensByKeyWord,
    getNumOfGardens
};
