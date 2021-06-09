const { request, response } = require('express');
const { findByIdAndUpdate, findOneAndUpdate } = require('../models/userModel');
const User = require('../models/userModel');
const userService = require('../services/userService');
const passport = require('passport'); 
var ActiveUsers = require('../common/realTime');

const getActiveUsers = (req, res) => {
  var countActiveUsers = ActiveUsers.countActiveUsers;
  res.json(countActiveUsers);
}
const createUser = async (request, response) => {
    var isAdmin = false;
    const newUser =
        await userService.createUser(
            request.body.firstName,
            request.body.lastName,
            request.body.email,
            request.body.description,
            User.hashPassword(request.body.password),
            isAdmin,
            request.body.photoID
        )

    response.json(newUser);
}

const getUserByEmail = async (request, response) => {
    const user = await userService.getUserByEmail(request.params.email);

    if (!user)
        return response.json(null);
    response.json(user);
};

const forgotPassword = async (request, response) => {

    const user = await userService.getUserByEmail(request.body.email);
    if (user) {
        const token = await userService.forgotPassword(user);
        if (!token) {
            return response.json(null);
        }
        else {
            return response.json({token:token,message:'Email sent'});
        }
    }
    return response.json(null);
}

const changePassword = async (request, response) => {
    const change = await userService.changePassword(User.hashPassword(request.body.password),request.body.id);
    if (change) {
        console.log('changed');
        return response.json("changed");
    }
    return response.json(null);
}

const verifyToken = async (request, response) => {
      const user = await userService.verifyToken(request.params.token);
       if (user) {
        return response.json(user);
    }
    else {
        return response.json('User not found');
    }
 }



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

const getUsersByKeyWord = async (request, response) => {
    const user = await userService.getUsersByKeyWord(request.params.key)
    if (!user)
        return response.status(404).json({ errors: ['Users not found'] });
    response.json(user);
};

const updateUser = async (request, response) => {

    const user = await userService.updateUser(
        request.body.id,
        request.body.firstName,
        request.body.lastName,
        request.body.email,
        request.body.description,
        request.body.password,
        request.body.photoID
        );

    if (!user) {
        return response.status(404).json({ errors: ['User not found'] });
    }
    response.json(user);
};

const updateUserByAdmin = async (request, response) => {

    const user = await userService.updateUserByAdmin(
        request.body.id,
        request.body.firstName,
        request.body.lastName,
        request.body.email,
        request.body.description,
        request.body.isAdmin);

    if (!user) {
        return response.status(404).json({ errors: ['User not found'] });
    }
    response.json(user);
};

const deleteUser = async (request, response) => {
    const user = await userService.deleteUser(request.params.userID);

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


const getAllPostsFromUser = async (request, response) => {
    const user = await userService.getUserById(request.params.userID)
    if (!user) {
        return null;
    }
    else
        response.send(user.posts)
}

const getAllNotificationsFromUser = async (request, response) => {
    const notifications = await userService.getAllNotificationsFromUser(request.params.userID);
    if (!notifications) {
        return null;
    }
    else
        response.send(notifications)
}


const setAllNotificationsToSeen = async (request, response) => {

    userService.setAllNotificationsToSeen(request.params.userID);


}

const getAllUnReadNotificationsFromUser = async (request, response) => {
    const notifications = await userService.getAllUnReadNotificationsFromUser(request.params.userID);
    if (!notifications) {
        return null;
    }
    else
        response.send(notifications)
}

module.exports = {
    getAllPostsFromUser,
    getAllGardensFromUser,
    createUser,
    forgotPassword,
    getUserById,
    getUsers,
    updateUser,
    updateUserByAdmin,
    deleteUser,
    getUserByEmail,
    getUsersGroupedByAdmin,
    getAllNotificationsFromUser,
    setAllNotificationsToSeen,
    getAllUnReadNotificationsFromUser,
    getUsersByKeyWord,
    getActiveUsers,
    changePassword,
    verifyToken
};
