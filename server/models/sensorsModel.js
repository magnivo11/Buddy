const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const sensorsSchema=new Schema({
 
    temperature: [{ curTemp: Number, date: { type: Date, default: Date.now }}],
    light: [{ curLight: Number, date: { type: Date, default: Date.now } }],
    soilMoisture: [{ curMoist: Number,date: { type: Date, default: Date.now } }],
    plantID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"plants"
    }
})

module.exports=mongoose.model('sensors',sensorsSchema);



