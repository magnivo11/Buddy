const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const photoSchema=new Schema({
    link:{type:String,
        index:{unique:true}},
    date: { type: Date, default: Date.now },
    plantID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"plants"
    }
})


module.exports=mongoose.model('photos',photoSchema);