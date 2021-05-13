const { response } = require('express');
const User = require('../models/userModel')
const Notification = require('../models/notificationModel')
const Garden = require('../models/gardenModel');
 const crypto = require('crypto');
require('dotenv').config();
const nodemailer = require('nodemailer');
 require('custom-env').env(process.env.NODE_ENV, './config');

 

const createUser = async(firstName,lastName,email,description,password)=>{
    const user= new User({
        firstName:firstName,
        lastName:lastName,
        email:email,
        description:description,
        password:password,
        isAdmin:false,
        gardens:[],
        posts:[],
      resetPasswordToken: 0,
        resetPasswordExpires: 0
     });
    return await user.save();
};

const getUserById = async (id) => {
    return await User.findById(id)
};

const getUsers = async () => { return await User.find({}) };

//how many admins are registered
const getUsersGroupedByAdmin = async () => {
    var adminNames = new Array();
    const users = await User.aggregate(
        [
 
            {$match: {isAdmin:true}},
            {$group: {_id:{firstName:"$firstName",isAdmin:"$isAdmin"}}},
            {$sort:{"_id.isAdmin":1}}
        ]);
        users.forEach((user)=>adminNames.push(user._id.firstName));
        return adminNames;
 };


const getAllGardensFromUser = async (id) => {
    const user = User.getUserById(id);
    return await user.gardens;
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
const getUserByEmail = async (email) => {
    const user = User.findOne({ email: email });
    if (!user) {
        return null;
    }
    else {
        return user;
    }
}


const verifyToken = async (resetPasswordToken) => {
      const user=await User.find( { resetPasswordToken: resetPasswordToken } )
      if (!user) {
         return null;
    }
    else {
         return user;
    }
}
const changePassword = async (password,id) => {
    console.log(password);
    console.log(id);
    const user = await User.findById(id);
    console.log(user);
    user.password=password;
    user.save(); 
    console.log(user);
    if (!user) {
        return null;
    }
    else {
        return user;
    }
}




const deleteUser = async (id) => {
    const user = User.getUserById(id);
    if (!user)
        return null;

    else {
        if (user.gardens.length) {
            for (let i = 0; i < user.gardens.length; i++) {
                Garden.findById(user.gardens[i].id, (err, garden) => {
                    if (garden)
                        deleteGarden(garden.id, user.id);
                }
                )
            }
            user.save()
        }
        await user.remove();
    }
    return user;
};
const getAllPostsFromUser = async (id) => {
    const user = User.findOne({ _id: id });
    if (!user) {
        return null;
    }
    else {
        return user;
    }
};
const getAllNotificationsFromUser = async (id) => {
    const notifications = Notification.find({ userID: id })
    if (!notifications) {
        return null;
    }
    else {
        return notifications;
    }
};
const setAllNotificationsToSeen = async (id) => {
    Notification.find({ userID: id }, (err, notifications) => {
        if (notifications)
            notifications.map((data, key) => {
                data.seen = true
                data.save()
            })
    })
}

const getAllUnReadNotificationsFromUser = async (id) => {
    const notifications = Notification.find({ userID: id, seen: false })
    if (!notifications) {
        return null;
    }
    else {
        return notifications;
    }
};


const forgotPassword = async (user) => {
     const token = crypto.randomBytes(20).toString('hex');
     user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    user.save();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
        },
    });
    const mailOptions = {
        from: 'littleBuddyweb@gmail.com',
        to: `${user.email}`,
        subject: 'Link to Reset Password',
        text: 'You are receving this because you have requested to reset your password to Little-Buddy website\nPlease click on the following link http://localhost:3000/reset/'+token+'\n If you did not request this please ignore this email '

    };

    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.error('error', err);
        }
        else {
            response.status(200).json('recovery email sent');
        }
    })
    return token; 
}




module.exports = {
    createUser,
    forgotPassword,
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
    verifyToken,
    changePassword
};