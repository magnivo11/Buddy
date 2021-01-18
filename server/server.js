const express = require ('express');
const bodyParser = require ('body-parser');
const cors= require('cors');
const http = require('http');
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const userRouter=require('./routes/userRouter')
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIo(server/*,{
    cors: {
        origins:["http://localhost:3000","http://localhost:4200"],
        methods:["GET","POST"] ,
        credentials: false

    }
}*/);

// this socketio purpose is counting how many users are connecting to the web in real-time
var count = 0; 
io.on('connection',(socket)=>{
if (socket.handshake.headers.origin ==="http://localhost:3000" ){
    count++;
    socket.broadcast.emit('count',count);
     socket.on('disconnect',()=>{
        count--;
        socket.broadcast.emit('count',count);
     });
}
});


app.use(cors());
app.use(bodyParser.json())
app.use('/user',userRouter)

console.log("Server is runnig...");

server.listen(8080);
