const { response } = require('express');
const User = require('../models/userModel')
const Notification = require('../models/notificationModel')
const Garden = require('../models/gardenModel');
const { group } = require('d3-array');


const createUser = async(firstName,lastName,email,description,password)=>{
    const user= new User({
        firstName:firstName,
        lastName:lastName,
        email:email,
        description:description,
        password:password,
        isAdmin:false,
        gardens:[],
        posts:[]
    });
    return await user.save();
};

const getUserById = async(id)=>{
    return await User.findById(id)};

const getUsers = async()=>{return await User.find({})};

//how many admins are registered
const getUsersGroupedByAdmin = async()=>{
        var adminNames=new Array();
      const users = await User.aggregate(
        [
            {$match: {isAdmin:true}},
            {$group: {_id:{firstName:"$firstName",isAdmin:"$isAdmin"}}},
            {$sort:{"_id.isAdmin":1}}
        ]);
        users.forEach((user)=>adminNames.push(user._id.firstName));
        return adminNames;
};


const getAllGardensFromUser = async(id)=>{const user = User.getUserById(id);
    return await user.gardens ;
};

const updateUser = async(id,firstName,lastName,email,description,password) =>{

    User.findById(id,(err,user)=>{
        user.firstName=firstName;
        user.lastName=lastName;
        user.email=email;
        user.description=description;
        user.password=password;
        user.lastUpdated= Date.now();
        user.save();
 
    });
    return true;
    };
const getUserByEmail = async(email)=>{
     const user = User.findOne({email:email});
        if(!user){
            return null;}
        else{
            return user;}
}

const deleteUser= async(id)=> {
    const user = User.getUserById(id);
    if (!user)
        return null;

    else
    {
        if(user.gardens.length){
             for(let i=0;i<user.gardens.length;i++){
                 Garden.findById(user.gardens[i].id,(err,garden)=>
                 {if (garden)
                     deleteGarden(garden.id,user.id);
                    }
                 )
             }
             user.save()    
        }
        await user.remove();
    }
    return user;
};

const getAllPostsFromUser = async(id)=>{
    const user = User.findOne({_id:id});
    if(!user){
        return null;}
    else{
        return user;}
};

const getAllNotificationsFromUser = async(id)=>{
    const notifications = Notification.find({userID:id})
    if(!notifications){
        return null;}
    else{
        return notifications;}
};

const setAllNotificationsToSeen =async (id)=>{
    Notification.find({userID:id},(err,notifications)=>{
        if(notifications)
        notifications.map((data,key)=>{
            data.seen=true
            data.save()
        })
    })
}

const getAllUnReadNotificationsFromUser = async(id)=>{
    const notifications = Notification.find({userID:id,seen:false})
    if(!notifications){
        return null;}
    else{
        return notifications;}
};

const getUsersByKeyWord = async (string) => {

    if (!string) {
      string = "";
    }
  
    return await User.aggregate([
      {
        $match: {
          $or: [
            { email: { $regex: string, $options: 'i' } },
            { firstName: { $regex: string, $options: 'i' } },
            { lastName: { $regex: string, $options: 'i' } },
            { description: { $regex: string, $options: 'i' } }
          ]
        }
      }
    ]);
};

module.exports={
createUser,
deleteUser,
updateUser,
getUserById,
getUserByEmail,
getUsers,
getAllGardensFromUser,
getUsersGroupedByAdmin,
getAllPostsFromUser,
getAllNotificationsFromUser,
setAllNotificationsToSeen,
getAllUnReadNotificationsFromUser,
getUsersByKeyWord
};