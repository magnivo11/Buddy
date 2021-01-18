const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const photoSchema=new Schema({
    link:String,
    date: { type: Date, default: Date.now }
})

module.exports=mongoose.model('photo',photoSchema);