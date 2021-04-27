const { request, response } = require('express');
const Post=require ('../models/postModel')
const PostService = require('../services/postService'); 



const createPost = async (request,response)=>{
    const newPost=
    await PostService.createPost(
        request.body.content,
        request.body.status,
        request.body.userID,
        )
     response.json(newPost);
}

const getPostById = async(request,response)=>{
    const post= await PostService.getPostById(request.params.id)
   if (!post)
    return response.status(404).json({errors:['post not found']});
   response.json(post);
};

const updatePost = async (request,response)=>{

    const post= await PostService.updatePost(
        request.body.id,
        request.body.content,
        request.body.status);
    
        if (!post){
        return response.status(404).json({errors:['post not found']});}
    response.json(post);
};
const getAllPosts= async (request,response)=>{
    const posts = await PostService.getAllPosts();
    response.json(posts);
}

const deletePost = async (request,response)=>{
    const post= await PostService.deletePost(request.body.postID, request.body.userID);
        if (!post){
        return response.status(404).json({errors:['post not found']});}
    response.json();
};

module.exports={
    createPost,
    getPostById,
    getAllPosts,
    updatePost,
    deletePost
 };
