const { constructorParametersDownlevelTransform } = require('@angular/compiler-cli');
const { response } = require('express');
const { toast } = require('react-toastify');
const Photo = require('../models/photoModel')
const Plant = require('../models/plantModel')


 
const createPhoto = async(link,name)=>{
 
    const photo= new Photo({
        link:link,
        name:name
    });

    await photo.save((err,photo)=>{
        if(err)
        {
        return err;
        }
         return photo;
    }); 

    // Plant.findById(plantID,(err,plant)=>{
    //     if (plant){
    //         plant.photos.push(photo);
    //         plant.save();
    //     }
    // });

    // return await photo.save();

};


const getPhoto = async(id)=>{return await Photo.findById(id)};

const getAllPhotos = async()=>{return await Photo.find({});}

 

const editPhoto = async(id,link) =>{
    const photo=Photo.getPhoto(id);
    if (!photo)
        return null;
    else
    {
        photo.link=link; 
    }
    await photo.save;
    return photo; 
    };

const deletePhoto= async(id)=> {
    const delPhoto = await getPhoto(id);
    if (!delPhoto)
        return null;
    else
        await delPhoto.remove();
    return true;
};

module.exports={
    createPhoto,
    deletePhoto,
    editPhoto,
    getPhoto,
    getAllPhotos
};