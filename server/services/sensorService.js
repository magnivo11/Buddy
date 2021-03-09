const { response } = require('express');
const Sensor = require('../models/sensorsModel')
const Plant = require('../models/plantModel')


const createSensor = async(temperature,light,soil,plantID)=>{
    const sensor= new Sensor({
      temperature: [{curTemp:temperature}],
      light: [{curLight:light}],
      soilMoisture: [{curMoist:soil}],
      plantID: plantID
   }); 
     await sensor.save((err,sensor)=>{
         Plant.findByIdAndUpdate(plantID,{sensorID:sensor._id},(err,plant)=>{
         })
         return sensor;
      });
      
};

 
const getSensorById = async(id)=>{return await Sensor.findById(id)};
const getAllSensors = async()=>{return await Sensor.find({})};

const deleteSensor = async(id)=>{
   const sensor = await getSensorById(id);
   if(!sensor)
   return null;
   else
   await sensor.remove();
   return sensor;

};



module.exports={
   getAllSensors, 
   createSensor,
   getSensorById,
   deleteSensor
};