const { request, response } = require('express');
const { findByIdAndUpdate, findOneAndUpdate } = require('../schema/userSchema');
const User=require('../schema/userSchema'); 

const getUserByEmail = (request,response)=>{
     User.findOne({email:request.params.email},(err,user)=>{
        if(err)
        {
        response.send(err)}
        else{
        response.send(user)}
    })
};

const getUserById = (request,response)=>{
    User.findOne({_id:request.params._id},(err,user)=>{
       if(err)
       {
       response.send(err)}
       else{
       response.send(user)}
   })
};

const createUser = (request,response)=>{
    const newUser={
        name:request.body.firstName,
        lastName:request.body.lastName,
        email:request.body.email,
        password:request.body.password,
        isAdmin:false,
        gardens:[],
        posts:[],
    }
    User.insertMany([newUser]);
response.send('new user is now registered');
}


const updateUser = (request,response)=>{
    const userUpdate={
        name:request.body.firstName,
        lastName:request.body.lastName,
        email:request.body.email,
        password:request.body.password
        }
        
   User.findOneAndUpdate({_id:request.body._id},userUpdate,(err,user)=>{
       if(err){
       response.send(err);}
       else{
       response.send('user updated successfully');}
   }); 
}

const deleteUser = (request,response)=>{
    User.deleteOne({_id:request.body._id})
}

const addGarden= (request,response)=>{
    console.log(request.body)
    User.findById(request.body.userID,(err,user)=>{
        user.gardens.push(request.body.garden._id)
        user.save()
    })
    
}


module.exports = {getUserByEmail,createUser,updateUser,deleteUser,addGarden}; 