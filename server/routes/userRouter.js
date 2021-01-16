const express=require('express');
var router= express.Router();
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const coneectionString='mongodb+srv://Nivo11:sheleg11@cluster0.k9bri.mongodb.net/Buddy_db?retryWrites=true&w=majority';
mongoose.connect(coneectionString,{ useUnifiedTopology: true, useNewUrlParser: true  });
const User=require('../schema/userSchema')
const Garden=require('../schema/gardenSchema')
const Plant=require('../schema/plantSchema');
const { request } = require('express');



//read / get user by id
router.get('/:_id',(request,response)=>{

    const user=User.findById(request.params._id,(err,user)=>{
        if(err)
        response.send(err)
        else
        response.send(user)
    })
})


//create user
// request must include:
// name:request.body.firstName,
// lastName:request.body.lastName,
// email:request.body.email,
// password:request.body.password,
                                   
router.post('/',(request,response)=>{
   
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
});

//update user details

//request must include 
//_id:request.body._id
// name:request.body.firstName,
// lastName:request.body.lastName,
// email:request.body.email,
// password:request.body.password,


router.put('/',(request,response)=>{

    const userUpdate={
        name:request.body.firstName,
        lastName:request.body.lastName,
        email:request.body.email,
        password:request.body.password
        }
        
   User.findOneAndUpdate({_id:request.body._id},userUpdate,(err,user)=>{
       if(err)
       response.send(err);
       else
       response.send('user updated successfully');
   });

});




// delete user
//request must include 
// _id:request.body._id


router.delete('/',(request,response)=>{
User.deleteOne({_id:request.body._id})

    
});



module.exports=router;