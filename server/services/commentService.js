
const Comment = require('../models/commentModel')
const User = require('../models/userModel')
const Post = require('../models/postModel')
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);


const createComment = async(content,postID, userID )=>{
    const comment= await new Comment({
        content: content,
        postID:postID,
        userID: userID
    }); 
    await Post.findByIdAndUpdate({_id:postID},{
        $push: {
        comments: {
           $each: [comment],
           $position: 0
        }}});
    return await comment.save();
      
};

const getCommentById = async(id)=>{return await Comment.findById(id)};
const getAllComments = async()=>{return await Comment.find({})};


const updateComment = async(id,content) =>{

    Comment.findById(id,(err,comment)=>{
        comment.content=content;
        comment.date= Date.now;
        comment.save();
        console.log(comment);

    });
    return true;
    };
const deleteComment = async(commentID,postID)=>{

    const comment = await getCommentById(commentID);
    if(!comment)
    return null;
    else{
        Post.findById(postID,(err,post)=>{
            var removeIndex;
            if(post.comments.length){
                 for(let i=0;i<post.comments.length;i++)
                     if(post.comments[i]==commentID)
                         removeIndex=i
                 post.comments.splice(removeIndex,1)
                 post.save();    
            }
        })
    await comment.remove();
    return comment;
    }
    };

    const getAllCommetsByPost = async(postID)=>{
        console.log(postID);
        return await Comment.find({postID:postID}); 
}
module.exports={
    createComment,
    getCommentById,
    getAllCommetsByPost,
    getAllComments,
    updateComment,
    deleteComment
};