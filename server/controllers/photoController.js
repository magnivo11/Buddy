const { request, response } = require('express');
const Photo=require('../models/photoModel')
const photoService = require('../services/photoService'); 


const createPhoto=async (request,response)=>{
   
     const newPhoto=  
    await photoService.createPhoto(request.body.link)
        response.json(newPhoto);
        response.send('new photo was created');  
    
    }

   
    const getPhoto= async (request,response)=>{
         const photo = await photoService.getPhoto(request.params.photoID);
        response.json(photo);
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
 


module.exports={createPhoto,
    deletePhoto,
    editPhoto,
    getPhoto
};
