const express = require ('express');
const bodyParser = require ('body-parser');
const cors= require('cors');
const mongoose= require('mongoose');
const Schema=mongoose.Schema;
<<<<<<< HEAD
const loginRouter=require('./routes/loginRouter')
=======
const userRouter=require('./routes/userRouter')

>>>>>>> b7ce8fc803fbb9cbbf0d2f8747f40927945afcb5

const app = express();


app.use(cors());
app.use(bodyParser.json())
app.use('/user',userRouter)


console.log("Server is runnig...");

app.listen(8080);