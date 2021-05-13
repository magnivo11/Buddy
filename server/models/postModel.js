const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const postSchema=new Schema({
    content: String,
    status: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ],
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    photoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"photos"
    }, 
    published: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
})

module.exports=mongoose.model('posts',postSchema);

