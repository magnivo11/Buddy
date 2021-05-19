const { response } = require('express');
const Garden = require('../models/gardenModel')
const User = require('../models/userModel')
const Plant = require('../models/plantModel');
const Photo = require('../models/photoModel');

const { deletePlantUser } = require('./plantService');
 

// create a garden and save ref to user gardens array
const createGarden = async(name,direction,directSun,surrounding,userID)=>{

    const garden= new Garden({
        name:name,
        direction:direction,
        directSun:directSun,
        surrounding:surrounding,
        userID:userID,
        plants:[]
    }); 
    User.findById(userID,(err,user)=>{
        if(user)
            user.gardens.push(garden)
    })
    return await garden.save();
};

  
const getGardensByUserId = async(userID)=>{
       return await Garden.find({userID:userID}); 
};
 const getGardenById = async(id)=>{return await Garden.findById(id)};

 const editGarden = async(id,name=null,direction=null,surrounding=null,directSun=null)=>{
    Garden.findById(id,(err,garden)=>{
        if (name!=null){
            garden.name = name;     }
         if (direction!=null){
            garden.direction = direction;}
         if (surrounding!=null){
            garden.surrounding = surrounding;}
        if (directSun!=null){
            garden.directSun = directSun;}
            garden.lastUpdated= Date.now();
            garden.save();
    
    });
   
     return true };

const getAllGardens = async()=>{
    return await Garden.find({})

};



const deleteGarden = async(gardenID,userID)=>{
    const garden = await getGardenById(gardenID);
 

    if (garden.plants.length>0)
    {

        for (let i=0; i<garden.plants.length ; i++)
        {
            deletePlantUser(garden.plants[i].id,gardenID); 
        }
    }
    //deleting garden ref from user 
  
   User.findById(userID,(err,user)=>{
       var removeIndex;
       if(user.gardens.length){
            for(let i=0;i<user.gardens.length;i++)
                if(user.gardens[i]==gardenID)
                    removeIndex=i
            user.gardens.splice(removeIndex,1)
            user.save()    
       }
   })

     await garden.remove(); 
    return true;
};

const getAllSelectedGardens = async(Direction,DirectSun,Surrounding)=>{
    var gar;
    await Garden.find({direction:Direction,directSun:DirectSun,surrounding:Surrounding},(err,gardens)=>{
        if(gardens)
        gar=gardens
        else
        return gar='no gardens found'

    })
    return gar
};

const getGardensByKeyWord = async (string) => {

    if (!string) {
      string = "";
    }
  
    return await Garden.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: string, $options: 'i' } },
            { direction: { $regex: string, $options: 'i' } },
            { surrounding: { $regex: string, $options: 'i' } }          ]
        }
      }
    ]);
};

const getNumOfGardens = async()=>{
    return await Garden.countDocuments();
};

module.exports={
    createGarden,
    getAllGardens,
    deleteGarden,
    getGardenById,
    getGardensByUserId,
    editGarden,
    getAllSelectedGardens,
    getGardensByKeyWord,
    getNumOfGardens
};