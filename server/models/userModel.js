const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('users', userSchema);