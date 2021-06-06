
const Post = require('../models/postModel')
const User = require('../models/userModel')
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
mongoose.set('useFindAndModify', false);
const { deleteComment } = require('./commentService');


const createPost = async(content, status, userID,photoID)=>{
    const post= await new Post({
        content: content,
        status:status,
        comments:[],
        userID: userID,
        photoID:photoID
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

const getPostsByUser = async(id)=> {
    return await Post.find({userID: id})
};

const getNumOfPosts = async()=>{
    return await Post.countDocuments({});
};

const updatePost = async(postID,content,userID,status,photoID) =>{
    Post.findById(postID,(err,post)=>{
        post.content=content;
        post.status= status;
        post.userID=userID;
        post.photoID=photoID,
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

const getPostsByKeyWord = async (string) => {

    if (!string) {
      string = "";
    }
  
    return await Post.aggregate([
      {
        $match: {
          $or: [
            { content: { $regex: string, $options: 'i' } },
            { status: { $regex: string, $options: 'i' } }
          ]
        }
      }
    ]);
};

module.exports={
    createPost,
    getPostById,
    getAllPosts,
    updatePost,
    deletePost,
    getNumOfPosts,
    getPostsByUser,
    getPostsByKeyWord
};