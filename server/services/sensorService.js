const { response } = require('express');
const mongoose = require('mongoose');

const Sensor = require('../models/sensorsModel')
const Plant = require('../models/plantModel')


const createSensor = async(plantID)=>{
   var randomSerial= Math.floor(Math.random() * 100);     // returns a random integer from 0 to 90
    const sensor= new Sensor({
      serialNumber: randomSerial,
      plantID: plantID
   }); 

     await sensor.save((err,sensor)=>{
      mongoose.set('useFindAndModify', false);
         Plant.findByIdAndUpdate(plantID,{sensorID:sensor._id},(err,plant)=>{
         var sensorID= sensor._id;
         var day=1;
      setInterval(function() {
         if(day<9){
         var rand= Math.floor(Math.random() * 20);     // returns a random integer from 0 to 9
         fabricateData(sensorID,day,rand);
         day++;}
      }, 60 * 1);
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

const getSensorBySerialNumber = async(serialNumber)=>{
   const sensor = Sensor.findOne({serialNumber:serialNumber});
       if(!sensor){
           return null;}
       else{
           return sensor;}
}

 const fabricateData = async(sensorID,day,rand)=>{
   Sensor.findById(sensorID,(err,sensor)=>{
      if (sensor){      
       sensor.temperature.push({curTemp:30+rand,date:new Date(2020, 7, day, 6, 0, 0, 0)});
       sensor.soilMoisture.push({curMoist:60+rand,date:new Date(2020, 7, day, 6, 0, 0, 0)});
       sensor.light.push({curLight:60+rand, date:new Date(2020, 7, day, 6, 0, 0, 0)});
       
       sensor.temperature.push({curTemp:30+rand,date:new Date(2020, 7, day, 18, 0, 0, 0)});
       sensor.soilMoisture.push({curMoist:60+rand,date:new Date(2020, 7, day, 18, 0, 0, 0)});
       sensor.light.push({curLight:60+rand, date:new Date(2020, 7, day, 18, 0, 0, 0)});
      sensor.save();
      }
      });
    return true;
 };



module.exports={
   getAllSensors, 
   createSensor,
   getSensorById,
   deleteSensor,
   fabricateData,
   getSensorBySerialNumber
};