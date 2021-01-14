const express=require('express');
var router= express.Router();
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const coneectionString='mongodb+srv://Nivo11:sheleg11@cluster0.k9bri.mongodb.net/Buddy_db?retryWrites=true&w=majority';
mongoose.connect(coneectionString,{ useUnifiedTopology: true, useNewUrlParser: true  });
const User=require('../schema/userSchema')
const Garden=require('../schema/gardenSchema')
const Plant=require('../schema/plantSchema')

//register
                                     
router.post('/register',(request,response)=>{
    User.insertMany([{
        name:request.body.firstName,
        lastName:request.body.lastName,
        email:request.body.email,
        password:request.body.password,
        isAdmin:false,
        gardens:[],
        posts:[],
    }])
response.send('new user is now registered');
});

//update user details
//does not work yet

router.post('/update',(request,response)=>{
    const filter={email:'magnivo11@gmail.com'}
    const newData={isAdmin:true}
    User.findOneAndUpdate(filter,newData,{upsert: true});
response.send('user updated');
});





router.post('/addGarden',(request,response)=>{
    Garden.insertMany([{
        name:request.body.name,
        size:request.body.size,
        direction:request.body.directions,
        surrounding:request.body.surrounding,
        directSun:request.body.directSun,
        userID:request.body.userID,
        plants:[]

    }])

    
});



module.exports=router;