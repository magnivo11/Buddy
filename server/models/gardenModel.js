const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gardenSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    direction: {
        type: String,
        enum: ['West', 'East', 'South', 'North'],
    },
    surrounding: {
        type: String,
        enum: ['Outdoor', 'Indoor'],
    },
    directSun: Boolean,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    plants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "plants"
    }]

})

module.exports = mongoose.model('gardens', gardenSchema);