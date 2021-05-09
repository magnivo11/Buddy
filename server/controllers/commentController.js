const { request, response } = require('express');
const Comment=require ('../models/commentModel')
const CommentService = require('../services/commentService'); 



const createComment = async (request,response)=>{
    const newComment=
    await CommentService.createComment(
        request.body.content,
        request.body.postID,
        request.body.userID,
        )
     response.json(newComment);
}

const getCommentById = async(request,response)=>{
    const comment= await CommentService.getCommentById(request.params.id)
   if (!comment)
    return response.status(404).json({errors:['comment not found']});
   response.json(comment);
};

const updateComment = async (request,response)=>{

    const comment= await CommentService.updateComment(
        request.body.id,
        request.body.content);
    
        if (!comment){
        return response.status(404).json({errors:['comment not found']});}
    response.json(comment);
};
const getAllComments= async (request,response)=>{
    const comments = await CommentService.getAllComments();
    if(comments)
    response.json(comments);
    else
    return null;
}
const deleteComment = async (request,response)=>{
    const comment= await CommentService.deleteComment(request.body.commentID, request.body.postID);
        if (!comment){
        return response.status(404).json({errors:['comment not found']});}
    response.send();
};
const getAllCommentsByPost = async (request,response)=>{
    const comments = await CommentService.getAllCommetsByPost(request.params.postID);
   response.json(comments); 
}

module.exports={
    createComment,
    getCommentById,
    getAllComments,
    getAllCommentsByPost,
    updateComment,
    deleteComment
 };
