const { response } = require('express');
const Garden = require('../models/gardenModel')
const User = require('../models/userModel')

const createGarden = async(name,direction,surrounding,directSun,userID)=>{
     const garden= new Garden({
    name:name,
    direction:direction,
    surrounding:surrounding,
    directSun:directSun,
    userID:userID,
    plants:[]
    }); 
    return await garden.save();
};

  
const getGardensByUserId = async(userID)=>{
    console.log("SESRVICE getGardensByUserId"); 
       return await Garden.find({userID:userID}); 
};
 const getGardenById = async(id)=>{return await Garden.findById(id)};
const getAllGardens = async()=>{return await Garden.find({})
};


 
module.exports={
createGarden,
getAllGardens,
getGardenById,
getGardensByUserId
};