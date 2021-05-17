const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

//mongoose mongoDB imports 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 // routers imports 
const userRouter = require('./routes/userRouter')
const gardenRouter = require('./routes/gardenRouter')
const plantRouter = require('./routes/plantRouter')
const photoRouter = require('./routes/photoRouter')
const sensorRouter = require('./routes/sensorRouter')
const postRouter=require('./routes/postRouter')
const commentRouter=require('./routes/commentRouter')

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
var countPlants = 0;
var countPosts = 0;
var adminMessage = ''

plantService.getNumOfPlants().then((docs) => {
    countPlants= docs;
    myEmitter.emit('emitPlant');
});

postService.getNumOfPosts().then((docs) => {
    countPosts= docs;
    myEmitter.emit('emitPost');
});

myEmitter.on('createPlant', () => {
    countPlants++;
    myEmitter.emit('emitPlant');
});

myEmitter.on('deletePlant', () => {
    countPlants--;
    myEmitter.emit('emitPlant');
});


myEmitter.on('createPost', () => {
    countPosts++;
    myEmitter.emit('emitPost');
});

myEmitter.on('deletePost', () => {
    countPosts--;
    myEmitter.emit('emitPost');
});

io.on('connection', (socket) => {
    if (socket.handshake.headers.origin === process.env.REACT_URL) {
        ActiveUsers.countActiveUsers++;
        socket.broadcast.emit('countActiveUsers', ActiveUsers.countActiveUsers);

        socket.on('disconnect', () => {
            ActiveUsers.countActiveUsers--;
            socket.broadcast.emit('countActiveUsers', ActiveUsers.countActiveUsers);
        });
    }

    else if (socket.handshake.headers.origin === process.env.ANGULAR_URL) {
        socket.broadcast.emit('countActiveUsers', ActiveUsers.countActiveUsers);           
        socket.broadcast.emit('countPlants', countPlants);
        socket.broadcast.emit('countPosts', countPosts);

        myEmitter.on('emitPlant', () => {
            socket.broadcast.emit('countPlants', countPlants);
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

// app.use(cors());
app.use(cors({
    origin:[process.env.REACT_URL,process.env.ANGULAR_URL],
    credentials:true
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
app.use('/post',postRouter)
app.use('/comment',commentRouter)

console.log("Server is listening to port " + process.env.PORT);
server.listen(process.env.PORT);



