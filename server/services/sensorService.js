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
      var i=0;
      console.log(sensor._id);
         Plant.findByIdAndUpdate(plantID,{sensorID:sensor._id},(err,plant)=>{
         })
         setInterval(function() {
            var rand= Math.floor(Math.random() * 10);     // returns a random integer from 0 to 9
            fabricateData(sensor._id,i,rand);
            i++;
         }, 60 * 1000);
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
 const fabricateData = async(sensorID,day,rand)=>{
    console.log(sensorID);
   Sensor.findById(sensorID,(err,sensor)=>{
      if (sensor){
      
      console.log(sensor._id);
      
       sensor.temperature.push({curTemp:30+rand,date:new Date(2020, 7, day, 6, 0, 0, 0)});
       sensor.soilMoisture.push({curMoist:60+rand,date:new Date(2020, 7, day, 6, 0, 0, 0)});
       sensor.light.push({curLight:60+rand, date:new Date(2020, 7, day, 6, 0, 0, 0)});
       
       sensor.temperature.push({curTemp:20+rand,date:new Date(2020, 7, day, 18, 0, 0, 0)});
       sensor.soilMoisture.push({curMoist:20+rand,date:new Date(2020, 7, day, 18, 0, 0, 0)});
       sensor.light.push({curLight:20+rand, date:new Date(2020, 7, day, 18, 0, 0, 0)});
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
   fabricateData
};