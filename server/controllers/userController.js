const { request, response } = require('express');
const { findByIdAndUpdate, findOneAndUpdate } = require('../models/userModel');
const User=require('../models/userModel'); 
const userService = require('../services/userService'); 


const createUser = async (request,response)=>{
    console.log("con"+  request.body.name,);
    const newUser=
    await userService.createUser(
        request.body.name,
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
    const user= await userService.getUserById(request.params.id)
   if (!user)
    return response.status(404).json({errors:['User not found']});
   response.json(user);
};


const updateUser = async (request,response)=>{
    console.log("con"+request.body.id);

    const user= await userService.updateUser(
        request.body.id,
        request.body.name,
        request.body.lastName,
        request.body.email,
        request.body.password);
    
        if (!user){
        return response.status(404).json({errors:['User not found']});}
    response.json(user);
};


const deleteUser = async (request,response)=>{
    const user= await userService.deleteUser(request.body.userID);
    
        if (!user){
        return response.status(404).json({errors:['User not found']});}
    response.send();
};


const getAllGardensFromUser = async (request,response)=>{
    const allGardens= await userService.getAllGardensFromUser(request.params.userID);
    
        if (!allGardens){
        return response.status(404).json({errors:['Gardens not found']});}
    response.send();
};








module.exports = {getAllGardensFromUser,createUser,getUserById,getUsers,updateUser,deleteUser,getUserByEmail}; 
