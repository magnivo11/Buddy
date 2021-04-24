import React from "react"
import axios from 'axios';
import '../../css/SocialNetworkProfile.css'
import Comments from "./Comments"


export default function Post({postID, change,deletePost}) {
    const [post,setPost]=React.useState([]);
    const [writerUser,setUser]=React.useState({_id:''});
    var statusColor;
    React.useEffect(() => {
        fetch('http://localhost:8080/post/'+postID)
          .then(response => response.json()).then(
            data => {
            setPost(data)
            fetch('http://localhost:8080/user/'+data.userID)
            .then(response => response.json()).then(
              data => {setUser(data);}
            )
            }
          )
      }, []);

    var red=false; var green=false; var orange=false;
    if (post.status=='red') red=true;
    if (post.status=='orange') orange=true;
    if (post.status=='green') green=true;


    const d = new Date(post.date);
    const now = new Date();

    var diff = (now-d);
    var diffDays = Math.floor(diff / 86400000); // days
    var diffHrs = Math.floor((diff % 86400000) / 3600000); // hours
    var diffMins = Math.floor((diff/1000)/60)%60 ;
    var timestamp = diffMins;
    if (diffHrs){
        if (diffHrs==1) timestamp = diffHrs + " hour, " + timestamp;
        else (timestamp = diffHrs + " hours, " + timestamp);
    }
    if (diffDays){
        if (diffDays==1) timestamp = diffDays + " day, " + timestamp;
        else (timestamp = diffDays + " days, " + timestamp);
    }

    return (     
        <div className="d-flex align-items-start profile-feed-item">
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="profile" className="img-sm rounded-circle" />
            <div className="ml-4">
            <h6 style={{fontSize:'16px', fontWeight:'bold'}}>
            {writerUser.name} {writerUser.lastName}
                <small style={{fontSize:'10px'}}className="ml-4 text-muted">

                <i className="mdi mdi-clock mr-1" />{timestamp} min ago</small>
            </h6>
            {red&&<a style={{background:'red'}}href="http://example.com" class="round-button"></a>}
            {green&&<a style={{background:'green'}}href="http://example.com" class="round-button"></a>}
            {orange&&<a style={{background:'orange'}}href="http://example.com" class="round-button"></a>}

            <p>{post.content}</p>
            { <Comments postId={postID} deletePost={deletePost} postWriterID={post.userID} /> }

            </div>
        </div>
                    
    );
}