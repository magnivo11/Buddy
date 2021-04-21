import React from "react"
import SinglePost from "./SinglePost"

export default function PostList({posts,change,deletePost}) { 

    if (posts.length<1)
    return (
        <div></div>
    );
    else{  
    return (
        <div>
             {posts.map((data,key) =>
                { return <SinglePost postID={data} change={change} deletePost={deletePost}key={key}/>
            })}   
        </div>
    );
    }
}