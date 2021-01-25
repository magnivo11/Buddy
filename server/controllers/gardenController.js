const Garden=require('../models/garden')
  
const get=(request,response)=>{
    Garden.find().then
    (results=>
        {response.json(results);});
}

const createGarden= (request,response)=>{
   
    var newGarden= new Garden({
        name:request.body.name,
        direction:request.body.direction,
        directSun:request.body.directSun,
        surroundings:request.body.surrounding,
        userID:request.body.userID

    })
    newGarden.save((err,garden)=>{
        if(err)
        response.send(err)
        else
        response.send(garden)
    })
}

module.exports={createGarden,get};
