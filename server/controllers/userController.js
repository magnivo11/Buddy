const { request, response } = require('express');
const { findByIdAndUpdate, findOneAndUpdate } = require('../models/user');
const User=require('../models/user'); 
const userService = require('../services/user'); 


const createUser = async (request,response)=>{
    const newUser=
    await userService.createUser(
        request.body.firstName,
        request.body.lastName,
        request.body.email,
        request.body.password)
       
     response.json(newUser);
response.send('new user is now registered');
}

const getUserByEmail = (request,response)=>{
    User.findOne({email:request.params.email},(err,user)=>{
       if(err)
       {
       response.send(err)}
       else{
       response.send(user)}
   })
};

const getUsers= async (request,response)=>{
    const users = await userService.getUsers();
    response.json(users);
}

const getUserById = async(request,response)=>{
    const user= await userService.getUserById(request.params.userID)
   if (!user)
    return response.status(404).json({errors:['User not found']});
   response.jason(user);
};

const updateUser = async (request,response)=>{
    const user= await userService.updateUser(
        request.body.userID,
        request.body.firstName,
        request.body.lastName,
        request.body.email,
        request.body.password);
    
        if (!user)
        return response.status(404).json({errors:['User not found']});
    response.json(user);
};


const deleteUser = async (request,response)=>{
    const user= await userService.updateUser(request.body.userID);
    
        if (!user)
        return response.status(404).json({errors:['User not found']});
    response.send();
};

const addGarden= (request,response)=>{
    console.log(request.body)
    User.findById(request.body.userID,(err,user)=>{
        user.gardens.push(request.body.garden._id)
        user.save()
    })
    
}


module.exports = {createUser,getUserById,getUsers,updateUser,deleteUser,addGarden,getUserByEmail}; 
