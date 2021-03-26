const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const photoSchema=new Schema({
    link:{type:String,
        index:{unique:true}},
    date: { type: Date, default: Date.now },
    plantID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"plants"
    },
    name:String
})


module.exports=mongoose.model('photos',photoSchema);