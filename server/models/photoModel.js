const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    link: {
        type: String,
        index: { unique: true }
    },
    date: { type: Date, default: Date.now },
    name: String,
    img: { data: Buffer, contentType: String }
})


 
module.exports = mongoose.model('photos', photoSchema);