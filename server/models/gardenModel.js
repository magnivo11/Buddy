const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gardenSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    direction: {
        type: String,
        enum: ['west', 'east', 'south', 'north'],
    },
    surrounding: {
        type: String,
        enum: ['outdoor', 'indoor'],
    },
    directSun: Boolean,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    plants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "plants"
    }],
    currentTemp:{value: {type:Number,min:(-12),max:50} , date: { type: Date, default: Date.now }},
    currentLight:{ value: {type:Number,min:0,max:100}, date: { type: Date, default: Date.now } },
    currentMoist:{ value: {type:Number,min:0,max:100},date: { type: Date, default: Date.now } }

})

module.exports = mongoose.model('gardens', gardenSchema);