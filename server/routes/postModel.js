const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const postSchema=new Schema({
    content: String,
    date: { type: Date, default: Date.now },
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
    }
})

module.exports=mongoose.model('posts',postSchema);

