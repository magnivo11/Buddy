const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const gardenSchema=new Schema({
    name:String,
    size:String,
    direction:String,
    surrounding:String,
    directSun:Boolean,
    userID:String,
    plants:[String]

})

module.exports=mongoose.model('gardens',gardenSchema);