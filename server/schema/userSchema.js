const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:String,
    lastName:String,
    email:String,
    password:String,
    isAdmin:Boolean,
    gardens:[String],
    posts:[String]

})

module.exports=mongoose.model('users',userSchema);