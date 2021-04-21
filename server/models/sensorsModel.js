const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const sensorsSchema=new Schema({
 
    serialNumber: String,
    temperature: [{ value: {type:Number,min:(-12),max:50} , date: { type: Date, default: Date.now }}],
    light: [{ value: {type:Number,min:0,max:100}, date: { type: Date, default: Date.now } }],
    soilMoisture: [{ value: {type:Number,min:0,max:100},date: { type: Date, default: Date.now } }],
    plantID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"plants"
    }
})

module.exports=mongoose.model('sensors',sensorsSchema);



