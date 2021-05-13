const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const commentSchema=new Schema({
    content: String,
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"posts"
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    published: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },

})

module.exports=mongoose.model('comments',commentSchema);

