const { response } = require('express');
const Garden = require('../models/gardenModel')
const User = require('../models/userModel')
const Plant = require('../models/plantModel');
 


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

 const editGarden = async(id,name=null,direction=null,surrounding=null,directSun=null,userID=null)=>{
    const garden = await getGardenById(id);
    if (!garden)
    {
        return null;
    }
    if (name!=null){
        garden.name = name;     }
     if (direction!=null){
        garden.direction = direction;}
     if (surrounding!=null){
        garden.surrounding = surrounding;}
    if (directSun!=null){
        garden.directSun = directSun;}
    await garden.save(); 
     return true };

const getAllGardens = async()=>{return await Garden.find({})
};

const deletePlantInGarden = async(gardenID,plantID)=>{
    const garden = await getGardenById(gardenID);
    const plant = await garden.plants.findById(plantID);
    plant.remove();

    return await true;
}

const deleteGarden = async(id)=>{
    const garden = await getGardenById(id);
    if (garden.plants.length>0)
    {
        for (let i=0; i<garden.plants.length ; i++)
        {
            deletePlantInGarden(id,garden.plants[i]); 
        }
    }
    await garden.remove(); 
    return true;
};

module.exports={
createGarden,
getAllGardens,
deleteGarden,
deletePlantInGarden,
getGardenById,
getGardensByUserId,
editGarden
};