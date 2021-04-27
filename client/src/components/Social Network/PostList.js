import React from "react"
import Post from "./Post"

export default function PostList({posts,change,deletePost}) { 

    

    if (posts.length<1)
    return (
        <div></div>
    );
    else{  
    return (
        <div>
             {posts.map((data,key) =>
                {
                   
                    return <Post postID={data} change={key} deletePost={deletePost} key={key}/>
            })}   
        </div>
    );
    }
}