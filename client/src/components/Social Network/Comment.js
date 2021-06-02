import React from "react"
import {Link} from 'react-router-dom'


export default function Comment({comment, onDelete,commentWriterID}) {   
    const loggedUserID = window.sessionStorage.getItem('userID');
    const [commentWriter,setCommentWriter]=React.useState({_id:'',firstName:'',lastName:''});
    const [deletePermission, setDeletePermission] = React.useState(false);


    React.useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL+'/user/'+comment.userID)
          .then(response => response.json()).then(
            data => {setCommentWriter(data)
              if (loggedUserID===data._id){
                setDeletePermission(true); 
            }
            }
          )
      }, []);
      const d = new Date(comment.published);
      const now = new Date();
  
      var diff = (now-d);
      var diffDays = Math.floor(diff / 86400000); // days
      var diffHrs = Math.floor((diff % 86400000) / 3600000); // hours
      var diffMins = Math.floor((diff/1000)/60)%60 ;
      var timestamp = diffMins;
      if (diffHrs){
          timestamp = diffHrs + " hours, " + timestamp;
      }
      if (diffDays){
          timestamp = diffDays + " days, " + timestamp;
      }

      return (        
        <div className="d-flex align-items-start profile-feed-item">
        {/* <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="profile" className="commentUserPhoto rounded-circle" /> */}
        <div className="ml-4">
        <h6>
            <Link className="nav-link singleComment"   to={`/profile/${commentWriter._id}`}>{commentWriter.firstName} {commentWriter.lastName} </Link>
                <small className="ml-4 text-muted timeAgo">
                <i className="mdi mdi-clock mr-1" />{timestamp} min ago</small>
            </h6>
        <p><small> &nbsp;&nbsp; &nbsp;&nbsp;{comment.content}</small>  </p>
 
        {deletePermission &&<button  style={{fontSize:'10px',border:'white',background:'none'}} onClick={()=>onDelete(comment._id)}  type="button" className="w3-button w3-theme-d2 w3-margin-bottom">
          <i className="fa fa-trash" /> &nbsp;Delete</button>}
        </div>
    </div>
      );
      
}