const { response } = require('express');
const User = require('../models/userModel')
const Garden = require('../models/gardenModel')


const createUser = async(name,lastName,email,password)=>{
    console.log("ser"+lastName);

    const user= new User({
        name:name,
        lastName:lastName,
        email:email,
        password:password,
        isAdmin:false,
        gardens:[]
    });
    return await user.save();
};

const getUserById = async(id)=>{return await User.findById(id)};

const getUsers = async()=>{return await User.find({})};

const getAllGardensFromUser = async(id)=>{const user = User.getUserById(id);
    return await user.gardens ;
};

const updateUser = async(id,name,lastName,email,password) =>{
    console.log("ser"+id);

    User.findById(id,(err,user)=>{
        user.name=name;
        user.lastName=lastName;
        user.email=email;
        user.password=password;
        user.save();
        console.log(user);

    });
    return true;
    };
const getUserByEmail = async(email)=>{
    console.log(email)
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

module.exports={
createUser,
deleteUser,
updateUser,
getUserById,
getUserByEmail,
getUsers,
getAllGardensFromUser
};