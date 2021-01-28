const { response } = require('express');
const Photo = require('../models/photoModel')

 

const createPhoto = async(link)=>{
    const photo= new Photo({
        link:link
    });
    return await photo.save();
};

const getPhoto = async(id)=>{return await Photo.findById(id)};

 

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
    const delPhoto = photo.getPhoto(id);
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
    getPhoto
};