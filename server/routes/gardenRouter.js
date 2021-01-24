//import express
const express=require('express');
var router= express.Router();
//import mongoose
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const coneectionString='mongodb+srv://Nivo11:sheleg11@cluster0.k9bri.mongodb.net/Buddy_db?retryWrites=true&w=majority';
mongoose.connect(coneectionString,{ useUnifiedTopology: true, useNewUrlParser: true  });
const Garden=require('../schema/gardenSchema');

router.post('/',(request,response)=>{
    const newGarden={
        name:request.body.name,
        size:request.body.size,
        direction:request.body.direction,
        directSun:request.body.directSun,
        surroundings:request.body.surrounding,
        userID:request.body.user
    }
    Garden.insertMany([newGarden],(err,garden)=>{
        console.log(garden[0])
        response.send(garden[0])
    })
})




module.exports=router; 