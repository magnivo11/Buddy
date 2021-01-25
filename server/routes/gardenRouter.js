//import express
const express=require('express');
var router= express.Router();
//import mongoose
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const coneectionString='mongodb+srv://Nivo11:sheleg11@cluster0.k9bri.mongodb.net/Buddy_db?retryWrites=true&w=majority';
mongoose.connect(coneectionString,{ useUnifiedTopology: true, useNewUrlParser: true  });
const Garden=require('../models/garden');
const gardenController = require('../controllers/gardenController');
const { request } = require('express');

router.post('/',gardenController.createGarden)


router.get('/',gardenController.get)


////// get gardens by userID//////////////////
//move function to controller//////
router.get('/:userID',(request,response)=>{
    Garden.find({userID:request.params.userID}).then
    (results=>
        {response.json(results);});
})




module.exports=router; 