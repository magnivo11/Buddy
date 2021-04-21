const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const commentSchema=new Schema({
    content: String,
    date: { type: Date, default: Date.now },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"posts"
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
})

module.exports=mongoose.model('comments',commentSchema);

