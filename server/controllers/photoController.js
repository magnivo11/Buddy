const { constructorParametersDownlevelTransform } = require('@angular/compiler-cli');
const { request, response } = require('express');
const Photo = require('../models/photoModel');
const Plant = require('../models/plantModel');
const User = require('../models/userModel')
const Post = require('../models/postModel')
const photoService = require('../services/photoService');
const scrapeService = require('../services/scrapeService');

const createPhoto = async (request, response) => {

    const newPhoto =
        await photoService.createPhoto(request.body.link, request.body.name)
    response.json(newPhoto);
}

const getPhoto = async (request, response) => {
    const photo = await photoService.getPhoto(request.params.photoID);
    response.json(photo);
}

const getAllPhotos = async (request, response) => {
    const photos = await photoService.getAllPhotos();
    response.json(photos);
}

const editPhoto = async (request, response) => {
    const photo = await gardenService.editPhoto(request.params.id, request.body.link);
    if (photo == true) {
        response.send('photo was updated');
    }
}

const deletePhoto = async (request, response) => {
    const photo = await photoService.deletePhoto(request.params.photoID);
    if (photo == true) {
        response.send('photo was deleted');
    }
}


const scrapePhoto = async (request, response) => {
    const photos = await scrapeService.scrapePhoto(request.params.name);
    if (!photos) {
        return response.status(404).json({ errors: ['scrape failed'] })
    }
}

const uploadPhoto = async (link, type, ownerID,fileId) => {
     if (type == "plant") {
         await Plant.findById(ownerID, (err, plant) => {
            if (plant) {
                plant.photos.push(fileId);
                plant.save();
                return fileId;
            }
        })
    }
    if (type == "user") {
      

        await User.findById(ownerID, (err, user) => {
            if (user) {
                user.photoID=fileId;
                user.save();
                return fileId;
            }
        })
    }
    if (type == "post") {
        console.log("lepost")
        console.log(ownerID)
        console.log(fileId)
        await Post.findById(ownerID, (err, post) => {
            if (post) {
                post.photoID=fileId;
                post.save();
                return fileId;
            }
        })
    }
}


module.exports = {
    createPhoto,
    scrapePhoto,
    deletePhoto,
    editPhoto,
    getPhoto,
    getAllPhotos,
    uploadPhoto
};