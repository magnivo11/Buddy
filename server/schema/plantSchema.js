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
sensorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"sensorsSchema"
},
photos:[
    
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"photoSchema"
        }
    
],  
GardenID:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"gardenSchema"
}


})

module.exports=mongoose.model('plants',plantSchema);