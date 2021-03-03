const { request, response } = require('express');
const Photo=require('../models/photoModel')
const photoService = require('../services/photoService'); 
const scrapeService = require('../services/scrapeService'); 

const createPhoto=async (request,response)=>{
   
     const newPhoto=  
    await photoService.createPhoto(request.body.link, request.body.plantID)
        response.json(newPhoto);    
    }
   
    const getPhoto= async (request,response)=>{
         const photo = await photoService.getPhoto(request.params.photoID);
        response.json(photo);
    }

    const getAllPhotos= async (request,response)=>{
        const photos = await photoService.getAllPhotos();
       response.json(photos);
   }
 
    const editPhoto = async (request,response)=>{
        const photo = await gardenService.editPhoto(request.params.id,request.body.link);
            if(photo==true)
            {
            response.send('photo was updated');  }
        }

        const deletePhoto = async (request,response)=>{
              const photo = await photoService.deletePhoto(request.params.gardenID);
              if(photo==true)
              {
              response.send(' photo was deleted');  }        }
 
        
        const scrapePhoto = async (request,response)=>{
            const photos = await scrapeService.scrapePhoto(); 
            if (photos){
            response.send("photos was scraped");}     
        }
   
   
module.exports={createPhoto,
    scrapePhoto,
    deletePhoto,
    editPhoto,
    getPhoto,
    getAllPhotos
};
