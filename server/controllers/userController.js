const { request, response } = require('express');
const { findByIdAndUpdate, findOneAndUpdate } = require('../models/userModel');
const User = require('../models/userModel');
const userService = require('../services/userService');
const passport = require('passport'); 

const createUser = async (request, response) => {
    var isAdmin = false;
    if (request.body.code == "admincode") {
        isAdmin = true;
    }
    const newUser =
        await userService.createUser(
            request.body.name,
            request.body.lastName,
            request.body.email,
            User.hashPassword(request.body.password),
            isAdmin
            )

    response.json(newUser);
}

const getUserByEmail = async (request, response) => {
    const user = await userService.getUserByEmail(request.params.email);

    if (!user)
        response.json(null);
    response.json(user);
};

const getUsers = async (request, response) => {
    const users = await userService.getUsers();
    response.json(users);
}

const getUserById = async (request, response) => {
    const user = await userService.getUserById(request.params.id)
    if (!user)
        return response.status(404).json({ errors: ['User not found'] });
    response.json(user);
};


const updateUser = async (request, response) => {

    const user = await userService.updateUser(
        request.body.id,
        request.body.name,
        request.body.lastName,
        request.body.email,
        request.body.password);

    if (!user) {
        return response.status(404).json({ errors: ['User not found'] });
    }
    response.json(user);
};


const deleteUser = async (request, response) => {
    const user = await userService.deleteUser(request.body.userID);

    if (!user) {
        return response.status(404).json({ errors: ['User not found'] });
    }
    response.send();
};


const getAllGardensFromUser = async (request, response) => {
    const allGardens = await userService.getAllGardensFromUser(request.params.userID);

    if (!allGardens) {
        return response.status(404).json({ errors: ['Gardens not found'] });
    }
    response.send();
};


const getUsersGroupedByAdmin = async (request, response) => {
    const users = await userService.getUsersGroupedByAdmin();
    response.json(users);
}


// const loginUser = (req,res) =>{
// console.log("IM HERE"); 
//     passport.authenticate('local', function(err, user, info) {
//         if (err) { 
//             return res.status(501).json(err); }
//         if (!user) { return res.status(501).json(info); }
//         req.logIn(user, function(err) {
//           if (err) { return res.status(501).json(err); }
//           return res.status(200).json({message:'Login success'});
//         });
//       })(req, res);

// }


module.exports = {  getAllGardensFromUser, createUser, getUserById, getUsers, updateUser, deleteUser, getUserByEmail, getUsersGroupedByAdmin };
