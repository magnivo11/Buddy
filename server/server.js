const express = require ('express');
const bodyParser = require ('body-parser');
const cors= require('cors');
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const userRouter=require('./routes/userRouter')


const app = express();


app.use(cors());
app.use(bodyParser.json())
app.use('/user',userRouter)



console.log("Server is runnig...");

app.listen(8080);