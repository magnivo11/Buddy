import React from "react"
import axios from 'axios';
import '../../css/SocialNetworkProfile.css'
import Comments from "./Comments"
import {Link} from 'react-router-dom'
 


export default function Post({postID, change,deletePost,editPost}) {
    const loggedUserID = window.sessionStorage.getItem('userID');
    const [post,setPost]=React.useState([]);
     const [writerUser,setUser]=React.useState({_id:'',firstName:'',lastName:'',photoID:''});
     const [ownersPermissions, setOwnersPermissions] = React.useState(false);
    const [content, setContent] = React.useState("");
    const handleEditContectChange = (event) => {
        setContent(event.target.value);
      }
      const inputRef = React.useRef(null);


    React.useEffect(() => {
        postID &&  fetch(process.env.REACT_APP_SERVER_URL+'/post/'+postID)
          .then(response => response.json()).then(
            data => {
            setPost(data)
            setContent(data.content);
            fetch(process.env.REACT_APP_SERVER_URL+'/user/'+data.userID)
            .then(response => response.json()).then(
              data => {setUser(data);
                if(data._id==loggedUserID)
                setOwnersPermissions(true);
            }
            )
            }
          )
      }, [change,postID]);

    var red=false; var green=false; var orange=false;
    if (post.status=='Help') red=true;
    if (post.status=='Question') orange=true;
    if (post.status=='Tip') green=true;


    const d = new Date(post.published);
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
        <div className="d-flex align-items-start profile-feed-item" style={{fontFamily: "Open Sans"}}>
            <img src={process.env.REACT_APP_SERVER_URL+`/photo/find/${writerUser.photoID}`} alt="profile" className="img-sm rounded-circle postUserPhoto" />
            <div className="ml-4">
            <h6>
            <Link className="nav-link singlePost"   to={`/profile/${writerUser._id}`}>{writerUser.firstName +" "+ writerUser.lastName} </Link>
                <small className="ml-4 text-muted timeAgo">
                <i className="mdi mdi-clock mr-1" />{timestamp} min ago</small>
            </h6>
            {red&&<a style={{background:'red'}}className="round-button"></a>}
            {green&&<a style={{background:'green'}}className="round-button"></a>}
            {orange&&<a style={{background:'orange'}} className="round-button"></a>}

            <p>&nbsp;&nbsp;{content}</p>
             {post.photoID&&<img style={{width:'500px'}} src={process.env.REACT_APP_SERVER_URL+`/photo/find/${post.photoID}`}></img>}
              {ownersPermissions&& <div>
                <Link to={`/editpost/${postID}`}>
            <button  style={{fontSize:'9px',border:'white',background:'none'}}
          type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-pencil" />&nbsp;Edit </button>  
</Link>
             <button  style={{fontSize:'9px',border:'white',background:'none'}}
            onClick={()=>{
                deletePost(postID);
            }}type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-trash" />&nbsp;Delete </button>
            </div> } 

             <Comments postId={postID} deletePost={deletePost} postWriterID={post.userID} /> 

            </div>
        </div>
                    
    );
}
