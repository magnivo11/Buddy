const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ('bcrypt');
const { schema } = require('./gardenModel');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    description: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    gardens: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "gardens"
        }
    ],    
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts"
        }
    ],
    
    created: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    photoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"photos"
    }, 
})

userSchema.statics.hashPassword = function hashPassword (password)
{
    return bcrypt.hashSync(password,10); 
}

userSchema.methods.isValid = function (hashedPassword)
{
    return bcrypt.compareSync(hashedPassword,this.password); 
}

 


module.exports = mongoose.model('users', userSchema);