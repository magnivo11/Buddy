const { request, response } = require('express');
const Sensor=require('../models/sensorsModel')
const SensorService = require('../services/sensorService'); 



const createSensor = async (request,response)=>{

    const newSensor=
    await SensorService.createSensor(
        request.body.temperature,
        request.body.light,
        request.body.soil,
        request.body.plantID)
       
     response.json(newSensor);
}

const getAllSensors= async (request,response)=>{
    const sensors = await SensorService.getAllSensors();
    response.json(sensors);
}

const getSensorById = async(request,response)=>{
    const sensor= await SensorService.getSensorById(request.params.id)
   if (!sensor)
    return response.status(404).json({errors:['sensor not found']});
   response.jason(sensor);
};
const deleteSensor = async (request,response)=>{
    const sensor= await SensorService.deleteSensor(request.body.id);
    
        if (!sensor){
        return response.status(404).json({errors:['sensor not found']});}
    response.send();
};

const getSensorSoilMoisture = async(request,response)=>{
    const sensor=await SensorService.getSensorById(request.params._id)
    if(!sensor)
    console.log('eror')
    if(sensor.soilMoisture.length>14){
        const data=sensor.soilMoisture.slice(sensor.soilMoisture.length-1-14,sensor.soilMoisture.length-1)
        response.send(data)
    }
    else
    response.send(sensor.soilMoisture)

}

module.exports={
    createSensor,
    getAllSensors,
    getSensorById,
    deleteSensor,
    getSensorSoilMoisture
 };
