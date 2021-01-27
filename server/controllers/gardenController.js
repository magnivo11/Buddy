const { request, response } = require('express');
const Garden=require('../models/gardenModel')
const gardenService = require('../services/gardenService'); 


const createGarden=async (request,response)=>{
   
     const newGarden=  
    await gardenService.createGarden(  
        request.body.name,
        request.body.direction,
        request.body.directSun,
        request.body.surrounding,
        request.body.userID
        )
        response.json(newGarden);
        response.send('new garden was created');  
    
    }

   
    const getAllGardens= async (request,response)=>{
       const gardens = await gardenService.getAllGardens(); 
       response.json(gardens);

    }
    
    const getGardenById= async (request,response)=>{
        console.log("Controller from get garden by id");
        const garden = await gardenService.getGardenById(request.params.gardenID);
        response.json(garden);
    }

    const getGardensByUserId = async (request,response)=>{
        console.log("Controller from get garden by Userid");
         const gardens = await gardenService.getGardensByUserId(request.params.userID);
        response.json(gardens); 
    }


module.exports={createGarden,getAllGardens,getGardenById,getGardensByUserId};
