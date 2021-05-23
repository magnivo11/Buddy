const { response } = require('express');
const mongoose = require('mongoose');
const Notification = require('../models/notificationModel')
const Sensor = require('../models/sensorsModel')
const Garden = require('../models/gardenModel')
const Plant = require('../models/plantModel')

var emitter = require('../common/emitter');
var myEmitter = emitter.myEmitter;


 const createSensor = async(plantID,sensorId)=>{   
    const sensor= new Sensor({
      serialNumber: sensorId,
      plantID: plantID
   }); 

   await sensor.save((err,sensor)=>{
   mongoose.set('useFindAndModify', false);
   Plant.findByIdAndUpdate(plantID,{sensorID:sensor._id},(err,plant)=>{})
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
 const realTimeData= async(serialNumber,soilMoisture,temperature,light)=>{

   //finding the sensor
   await Sensor.findOne({serialNumber:serialNumber},(err,sensor)=>{
       if(err)
       return(err)
       if(sensor)
       {          
          //saving data to the sensor
         sensor.temperature.push({value:temperature,date:new Date()});
         sensor.soilMoisture.push({value:soilMoisture,date:new Date()});
         sensor.light.push({value:light,date:new Date()});

         //finding plant
         Plant.findOne({sensorID:sensor._id},(err,plant)=>{
            if(plant)
               Garden.findById(plant.GardenID,(err,garden)=>{
                  
                  //runnig tests according to the recived data and evaluating the plant's status
                  checkLastIrrigation(plant,soilMoisture)
                  tempTest(plant,temperature)
                  soilTest(plant,soilMoisture)
                  lightTest(plant,light)
                 
                  if(Math.abs(plant.moistStatus)==3||Math.abs(plant.tempStatus)==3||Math.abs(plant.lightStatus)==3)
                  plant.healthStatus=3
                  else if(Math.abs(plant.moistStatus)==2||Math.abs(plant.tempStatus)==2||Math.abs(plant.lightStatus)==2)
                  plant.healthStatus=2
                  else
                  plant.healthStatus=1

                  plant.save()
               })            
         })
        
          sensor.save()
          myEmitter.emit('sensor update')
         return (sensor)
       }
    })
 }

 const tempTest=async(plant,temperature)=>{
    
   //begining of test
     var status;
     var delta=temperature-plant.optimalTemp
     if(delta>7)
     status=3;
     else if(delta>2)
     status=2;
     else if(delta>-2)
     status=1;
     else if(delta>-7)
     status=-2;
     else 
     status=-3;

    //gives notification only when the status changes for worse or first measurement which is not 1
       if(plant.tempStatus&&plant.tempStatus!=status &&status!=1 ||plant.tempStatus==null&&status!=1){
           Garden.findById(plant.GardenID,(err,garden)=>{
            if(garden)
               sendNotification(garden.userID,plant,garden.name,status,'temperature')
         })    
      }  
      else
      {
         Garden.findById(plant.GardenID,(err,garden)=>{
            if(garden){
               //saving current temperature in garden
               garden.currentTemp={value:temperature,date:Date.now()}
               garden.save()
            }         
         })
      }               
    //saving status and last value
  plant.tempStatus=status
  plant.lastTemp={value:temperature,date:new Date()}

   
 }


 const soilTest=async(plant,soilMoisture)=>{

   //begining of test
   var status;
   var delta=soilMoisture-plant.optimalSoilMoisture
   if(delta>20)
      status=3;
   else if(delta>10)
      status=2;
   else if(delta>-10)
      status=1;
   else if(delta>-20)
      status=-2;
   else 
      status=-3;

 //gives notification only when the status changes for worse or first measurement which is not 1
   if(plant.moistStatus&&plant.moistStatus!=status &&status!=1 ||plant.moistStatus==null&&status!=1){
      Garden.findById(plant.GardenID,(err,garden)=>{
         if(garden)
         sendNotification(garden.userID,plant,garden.name,status,'soilMoisture')
      })    
   }  
   else
   {
      Garden.findById(plant.GardenID,(err,garden)=>{
         if(garden){
         //saving current soil moisture in garden
            garden.currentMoist={value:soilMoisture,date:Date.now()}
            garden.save()
         }
      })
   }   

 //saving status and last value 
   plant.moistStatus=status
   plant.lastSoil={value:soilMoisture,date:new Date()}
 }


 const lightTest=async(plant,light)=>{

  //begining of test
   var status;
   var delta=light-plant.optimalSunExposure
   if(delta>20)
   status=3;
   else if(delta>10)
   status=2;
   else if(delta>-10)
   status=1;
   else if(delta>-20)
   status=-2;
   else 
   status=-3;

 //gives notification only when the status changes for worse or first measurement which is not 1
   if(plant.lightStatus&&plant.lightStatus!=status &&status!=1 ||plant.lightStatus==null&&status!=1){
      Garden.findById(plant.GardenID,(err,garden)=>{
         if(garden)
         sendNotification(garden.userID,plant,garden.name,status,'light')
      })    
   }  
   else
   {
      Garden.findById(plant.GardenID,(err,garden)=>{
         if(garden){

            //saving current sun exposure in garden
            garden.currentLight={value:light,date:Date.now()}
            garden.save()
         }
      })
   }        

    //saving status and last value
   plant.lightStatus=status
   plant.lastLight={value:light,date:new Date()}
 }

 const checkLastIrrigation =async (plant,soilMoisture)=>{
      if(plant.lastSoil)
         if(plant.lastSoil.value<soilMoisture)
            plant.lastIrrigation=Date.now()
 }

const sendNotification=(userID,plant,gardenName,status,type)=>{
   const notification= new Notification({
      userID:userID, 
      plantStatus:status,
      seen:false,
      plantID:plant._id,
      type:type,
      plantSpecies:plant.species,
      gardenName:gardenName
   });    

   notification.save()
}

const updateSensors = async(sensorID, plantID) =>{
   return await Sensor.find({userID: id},(err,sensor)=>{
      sensor.serialNumber=plantID;
      sensor.save();
   });
};

const getSensorsByKeyWord = async (string) => {

   if (!string) {
      string = "";
   }

   return await Sensor.aggregate([
      {
         $match: {
         $or: [
            { serialNumber: { $regex: string, $options: 'i' } }
         ]
         }
      }
   ]);
};

module.exports={
   getAllSensors, 
   createSensor,
   getSensorById,
   deleteSensor,
   getSensorBySerialNumber,
   realTimeData,
   getSensorsByKeyWord,
   updateSensors
};