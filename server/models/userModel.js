const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:String,
    lastName:String,
    email:{type:String,
        index:{unique:true}},
    password:String,
    isAdmin:Boolean,
    gardens:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"gardens"
        }
    ]
})

module.exports=mongoose.model('users',userSchema);