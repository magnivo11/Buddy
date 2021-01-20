const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const sensorsSchema=new Schema({

    
    temperature: [{ curTemp: Number, date: { type: Date, default: Date.now }}],
    light: [{ curLight: Number, date: { type: Date, default: Date.now } }],
    soilMoisture: [{ curMoist: Number,date: { type: Date, default: Date.now } }],
   

})

module.exports=mongoose.model('sensor',sensorsSchema);



