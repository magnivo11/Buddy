import React from "react"
import Post from "./Post"

export default function PostList({posts,change,deletePost,editPost}) { 

    console.log(posts)

    if (posts.length<1)
    return (
        <div></div>
    );
    else{  
    return (
        <div>
             {posts.map((data,key) =>
                {
                   
                    return <Post postID={data} change={key} deletePost={deletePost} editPost={editPost} key={key}/>
            })}   
        </div>
    );
    }
}