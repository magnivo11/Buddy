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

    const editGarden = async (request,response)=>{
        const garden = await gardenService.editGarden(request.params.id,
            request.body.name,request.body.direction,request.body.surrounding,request.body.directSun);
            if(garden==true)
            {
            response.send(' garden was updated');  }
        }

        const deleteGarden = async (request,response)=>{
              const garden = await gardenService.deleteGarden(request.body.gardenID,request.body.userID);
              if(garden==true)
              {
              response.send(' garden was deleted');  }        }

        const deletePlantInGarden = async (request,response)=>{
              const deletePlant = await gardenService.deletePlantInGarden(request.params.gardenID,request.params.plantID);
              if(deletePlant==true)
              {
              response.send('plant was deleted'); 
             } 
                      }


module.exports={createGarden,deletePlantInGarden,deleteGarden,getAllGardens,getGardenById,editGarden,getGardensByUserId};
