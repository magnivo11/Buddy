
const Post = require('../models/postModel')
const User = require('../models/userModel')
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
mongoose.set('useFindAndModify', false);
const { deleteComment } = require('./commentService');


const createPost = async(content, status, userID )=>{
    const post= await new Post({
        content: content,
        status:status,
        comments:[],
        userID: userID
    }); 
    await User.findByIdAndUpdate({_id:userID},{
        $push: {
        posts: {
           $each: [post],
           $position: 0
        }}
    });
    return await post.save();
      
};

const getPostById = async(id)=> {return await Post.findById(id)};
const getAllPosts = async()=>{return await Post.find({})};

const updatePost = async(postID,content,status) =>{
    Post.findById(postID,(err,post)=>{
        post.content=content;
        post.status= status;
        post.lastUpdated= Date.now();
        post.save();
    });
    return true;
    };
const deletePost = async(postID,userID)=>{
    const post = await getPostById(postID);
    if(!post){
    return null;
    }
    else{
        if (post.comments.length>0)
        {
            for (let i=0; i<post.comments.length ; i++)
            {
                deleteComment(post.comments[i].id,postID); 
            }
        }
        User.findById(userID,(err,user)=>{
            var removeIndex;
            if(user.posts.length){
                 for(let i=0;i<user.posts.length;i++)
                     if(user.posts[i]==postID)
                         removeIndex=i
                 user.posts.splice(removeIndex,1)
                 user.save();
            }
        })
    await post.remove();

    return post;
    }
    };
module.exports={
    createPost,
    getPostById,
    getAllPosts,
    updatePost,
    deletePost
};