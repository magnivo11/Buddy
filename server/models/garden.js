const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const gardenSchema=new Schema({
    name:String,
    direction:String,
    surrounding:String,
    directSun:Boolean,
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    plants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"usersPlants"
    }]

})

module.exports=mongoose.model('gardens',gardenSchema);