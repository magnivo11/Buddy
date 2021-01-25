const { response } = require('express');
const User = require('../models/user')

const createUser = async(name,lastname,email,password)=>{
    const user= new User({
        name:name,
        lastname:lastname,
        email:email,
        password:password,
        isAdmin:false,
        gardens:[]
    });
    return await user.save();
};

const getUserById = async(id)=>{return await User.findById(id)};

const getUsers = async()=>{
    
     return await User.find({})
};


const updateUser = async(id,name,lastname,email,password) =>{
    const user= User.getUserById(id);
    if (!user)
        return null;
    else
    {
        user.name=name;
        user.lastname=lastname;
        user.email=email;
        user.password=password;
    }
    await user.save;
    return user
    };

const deleteUser= async(id)=> {
    const user = User.getUserById(id);
    if (!user)
        return null;

    else
        await user.remove(user);
    return user;
};

module.exports={
createUser,
deleteUser,
updateUser,
getUserById,
getUsers
};