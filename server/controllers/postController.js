const { request, response } = require('express');
const Post = require('../models/postModel')
const PostService = require('../services/postService');

var emitter = require('../common/emitter');
var myEmitter = emitter.myEmitter;


const createPost = async (request, response) => {
     const newPost =
        await PostService.createPost(
            request.body.content,
            request.body.status,
            request.body.userID,
            request.body.photoID
        );
    myEmitter.emit('createPost');
    response.json(newPost);
}

const getPostById = async (request, response) => {
    const post = await PostService.getPostById(request.params.id)
    if (!post)
        return response.status(404).json({ errors: ['post not found'] });
    response.json(post);
};

const getPostsByUser = async (request, response) => {
    const post = await PostService.getPostsByUser(request.params.userID)
    if (!post)
        return response.status(404).json({ errors: ['post not found'] });
    response.json(post);
};

const updatePost = async (request, response) => {
    const post = await PostService.updatePost(
        request.body.postID,
        request.body.content,
        request.body.userID,
        request.body.status);
    if (!post) {
        return response.status(404).json({ errors: ['post not found'] });
    }
    response.json(post);
};
const getAllPosts = async (request, response) => {
    const posts = await PostService.getAllPosts();
    response.json(posts);
}

const getNumOfPosts = async (request, response) => {
    const count = await PostService.getNumOfPosts();
    response.json(count);
}

const deletePost = async (request, response) => {
    const post = await PostService.deletePost(request.body.postID, request.body.userID);
    if (!post) {
        return response.status(404).json({ errors: ['post not found'] });
    }
    myEmitter.emit('deletePost');
    response.json();
};

const getPostsByKeyWord = async (request, response) => {
    const user = await PostService.getPostsByKeyWord(request.params.key)
    if (!user)
        return response.status(404).json({ errors: ['Posts not found'] });
    response.json(user);
};

module.exports = {
    createPost,
    getPostById,
    getAllPosts,
    updatePost,
    deletePost,
    getNumOfPosts,
    getPostsByUser,
    getPostsByKeyWord
};
