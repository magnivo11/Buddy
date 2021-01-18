const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const sensorSchema=new Schema({

    date: { type: Date, default: Date.now },
    temperature: [{ curTemp: Number, date: Date }],
    light: [{ curLight: Number, date: Date }],
    soilMoisture: [{ curMoist: Number, date: Date }],
    humidity: [{ curHumid: Number, date: Date }],

})

module.exports=mongoose.model('sensor',sensorSchema);



