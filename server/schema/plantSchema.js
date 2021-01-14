const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const plantSchema=new Schema({

name:String,
species:String,
irrigationInstructors:String,
// celsius
optimalTemp:Number,
// %
optimalSoilMoisture:Number,
optimalSunCondition:Number,
description:String,
status:String,
// the plants location in the garden 
location:String,
sensorID:String,
photos:[String],  
GardenID:String


})

module.exports=mongoose.model('plants',plantSchema);