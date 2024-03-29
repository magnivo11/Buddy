const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const path = require("path");
const multer = require("multer");
 
//mongoose mongoDB imports 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// routers imports 
const userRouter = require('./routes/userRouter')
const gardenRouter = require('./routes/gardenRouter')
const plantRouter = require('./routes/plantRouter')
const photoRouter = require('./routes/photoRouter')
const sensorRouter = require('./routes/sensorRouter')
const postRouter = require('./routes/postRouter')
const commentRouter = require('./routes/commentRouter')

// services imports
const plantService = require('./services/plantService')
const postService = require('./services/postService')

// real time imports
var EventEmitter = require('./common/emitter');
var ActiveUsers = require('./common/realTime');
var myEmitter = EventEmitter.myEmitter;

//passport imports
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
const User = require('./models/userModel');
// const MongoStore = require('connect-mongo');
require('dotenv').config();



//online users with web socket - socketio
const socketIo = require('socket.io');
require('custom-env').env(process.env.NODE_ENV, './config');
const app = express();
const server = http.createServer(app);
const io = socketIo(server/*,{
    cors: {
        origins:[process.env.REACT_URL,process.env.ANGULAR_URL],
        methods:["GET","POST"] ,
        credentials: false

    }
}*/);

// this socketio purpose is counting how many users are connecting to the web in real-time
//var countActiveUsers = ActiveUsers.countActiveUsers;
var countAdminPlants = 0;
var countUserPlants = 0;
var countPosts = 0;
var adminMessage = ''

plantService.getNumOfAdminPlants().then((docs) => {
    countAdminPlants= docs;
    myEmitter.emit('emitAdminPlant');
});

plantService.getNumOfUserPlants().then((docs) => {
    countUserPlants= docs;
    myEmitter.emit('emitUserPlant');
});

postService.getNumOfPosts().then((docs) => {
    countPosts= docs;
    myEmitter.emit('emitPost');
});

myEmitter.on('createAdminPlant', () => {
    countAdminPlants++;
    myEmitter.emit('emitAdminPlant');
});

myEmitter.on('deleteAdminPlant', () => {
    countAdminPlants--;
    myEmitter.emit('emitAdminPlant');
});

myEmitter.on('createUserPlant', () => {
    countUserPlants++;
    myEmitter.emit('emitUserPlant');
});

myEmitter.on('deleteUserPlant', () => {
    countUserPlants--;
    myEmitter.emit('emitUserPlant');
});


myEmitter.on('createPost', () => {
    countPosts++;
    myEmitter.emit('emitPost');
});

myEmitter.on('deletePost', () => {
    countPosts--;
    myEmitter.emit('emitPost');
});

myEmitter.on('sensor update',()=>{
    myEmitter.emit('send sensor update')
})

io.on('connection', (socket) => {
    if (socket.handshake.headers.origin === process.env.REACT_URL) {
        ActiveUsers.countActiveUsers++;
        socket.broadcast.emit('countActiveUsers', ActiveUsers.countActiveUsers);

        socket.on('disconnect', () => {
            ActiveUsers.countActiveUsers--;
            socket.broadcast.emit('countActiveUsers', ActiveUsers.countActiveUsers);
        });

        myEmitter.on('send sensor update',()=>{
            socket.broadcast.emit('check notifications')
            socket.broadcast.emit('sensor update')
        })
    }

    else if (socket.handshake.headers.origin === process.env.ANGULAR_URL) {
        socket.broadcast.emit('countActiveUsers', ActiveUsers.countActiveUsers);           
        socket.broadcast.emit('countAdminPlants', countAdminPlants);
        socket.broadcast.emit('countUserPlants', countUserPlants);
        socket.broadcast.emit('countPosts', countPosts);

        myEmitter.on('emitAdminPlant', () => {
            socket.broadcast.emit('countAdminPlants', countAdminPlants);
        });
        myEmitter.on('emitUserPlant', () => {
            socket.broadcast.emit('countUserPlants', countUserPlants);
        });
        myEmitter.on('emitPost', () => {
            socket.broadcast.emit('countPosts', countPosts);
        });
    }

    socket.on('message', (message) => {
        adminMessage = message;
        socket.broadcast.emit('message', adminMessage);
    })
});

app.use(cors({
    origin: [process.env.REACT_URL, process.env.ANGULAR_URL],
    credentials: true
}));

app.use(bodyParser.json());

//passport uses
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(expressSession({
    name: 'myname.id', secret: 'secret', resave: false, saveUninitialized: false, cookie: {
        maxAge: 36000000,
        httpOnly: false,
        secure: false
    },
}));

require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());



//router uses 
app.use('/user', userRouter);
app.use('/garden', gardenRouter)
app.use('/plant', plantRouter)
app.use('/photo', photoRouter)
app.use('/sensor', sensorRouter)
app.use('/post', postRouter)
app.use('/comment', commentRouter)

console.log("Server is listening to port " + process.env.PORT);
server.listen(process.env.PORT);
