const { response } = require('express');
const Sensor = require('../models/sensorsModel')
const Plant = require('../models/plantModel')
const data = require ('../files/data.json'); 


const createSensor = async(temperature,light,soilMoisture)=>{
   console.log("service");

    const sensor= new Sensor({
      temperature: [{curTemp:temperature}],
      light: [{curLight:light}],
      soilMoisture: [{currMoist:soilMoisture}]
   }); 
   
   return await sensor.save();
};

 
const getSensorById = async(id)=>{return await Sensor.findById(id)};
const getAllSensors = async()=>{return await Sensor.find({})};

const deleteSensor = async(id)=>{
   const sensor = Sensor.getSensorById(id);
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