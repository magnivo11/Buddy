const { PACKAGE_ROOT_URL } = require('@angular/core');
const { response } = require('express');
const { toast } = require('react-toastify');
const Photo = require('../models/photoModel')
const Plant = require('../models/plantModel')

const addPhotoToOwner = async (link, type, plantID) => {
  
}



const createPhoto = async (link, name) => {

    const photo = new Photo({
        link: link,
        name: name
    });


    await photo.save((err, img) => {
        if (err) {
            console.log("ERR");
            return err;
        }
    });

    return photo;



};


const getPhoto = async (id) => { return await Photo.findById(id) };

const getAllPhotos = async () => { return await Photo.find({}); }



const editPhoto = async (id, link) => {
    const photo = Photo.getPhoto(id);
    if (!photo)
        return null;
    else {
        photo.link = link;
    }
    await photo.save;
    return photo;
};

const deletePhoto = async (id) => {
    const delPhoto = await getPhoto(id);
    if (!delPhoto)
        return null;
    else
        await delPhoto.remove();
    return true;
};

module.exports = {
    createPhoto,
    deletePhoto,
    editPhoto,
    getPhoto,
    getAllPhotos,
    addPhotoToOwner,
};