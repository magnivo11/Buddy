const express = require ('express');
const bodyParser = require ('body-parser');
const cors= require('cors');
const http = require('http');
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const userRouter=require('./routes/userRouter')
const gardenRouter=require('./routes/gardenRouter')

const socketIo = require('socket.io');
require('custom-env').env(process.env.NODE_ENV,'./config'); 
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
var count = 0; 
io.on('connection',(socket)=>{
if (socket.handshake.headers.origin === process.env.REACT_URL  ){
    count++;
    socket.broadcast.emit('count',count);
     socket.on('disconnect',()=>{
        count--;
        socket.broadcast.emit('count',count);
     });
}
});

app.use(cors());
app.use(bodyParser.json());
app.use('/user',userRouter);
app.use('/garden',gardenRouter)



console.log("Server is runnig on port "+process.env.PORT);
 
server.listen(process.env.PORT);