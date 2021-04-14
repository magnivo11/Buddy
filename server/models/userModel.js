const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ('bcrypt');
const { schema } = require('./gardenModel');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: String,
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: String,
        required: true
    },
    gardens: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "gardens"
        }
    ]
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