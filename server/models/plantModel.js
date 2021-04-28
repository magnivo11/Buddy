const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const plantSchema=new Schema({
species: {
    type: String,
    required: true
  },
growthStatus:String,
healthStatus:Number,
tempStatus:Number,
lightStatus:Number,
moistStatus:Number,
isUserPlant:Boolean,
defaultPhotoID: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"photos"
}, 
irrigationInstructors:String, // celsius

optimalTemp: {
    type: Number,
    min: (-12),
    max: 50,
    required: true

  },

  optimalSunExposure: {
    type: Number,
    min: 0,
    max: 100,
    required: true

  },

  optimalSoilMoisture: {
    type: Number,
    min: 0,
    max: 100,
    required: true

  },

 
description:String,
sensorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"sensors"
},
photos:[
    {
    type: mongoose.Schema.Types.ObjectId,
    ref:"photos"
    }
    
],  
GardenID:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"gardens"
},
lastIrrigation: { type: Date, default: Date.now },
lastTemp:{ value: {type:Number,min:(-12),max:50,default:0} , date: { type: Date, default: Date.now }},
lastLight:{ value: {type:Number,min:0,max:100,default:0}, date: { type: Date, default: Date.now } },
lastSoil:{ value: {type:Number,min:0,max:100,default:0}, date: { type: Date, default: Date.now } }


})

module.exports=mongoose.model('plants',plantSchema);