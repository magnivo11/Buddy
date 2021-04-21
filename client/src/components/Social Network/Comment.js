import React from "react"

export default function Comment({comment, onDelete,commentWriterID}) {   
    const loggedUserID = window.sessionStorage.getItem('userID');
    const [commentWriter,setCommentWriter]=React.useState({_id:'',name:'',lastName:''});
    const [deletePermission, setDeletePermission] = React.useState(false);
    var commentDate= comment.date;


    React.useEffect(() => {
        fetch('http://localhost:8080/user/'+comment.userID)
          .then(response => response.json()).then(
            data => {setCommentWriter(data)
              if (loggedUserID===data._id){
                setDeletePermission(true); 
            }
            }
          )
      }, []);
      const d = new Date(commentDate);
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
        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="profile" className="img-sm rounded-circle" />
        <div className="ml-4">
        <h6>
        {commentWriter.name} {commentWriter.lastName}
            <small className="ml-4 text-muted">
            <i className="mdi mdi-clock mr-1" />{timestamp} min ago</small>
        </h6>
        <p>{comment.content}</p>
 
        {deletePermission &&<button  style={{fontSize:'14px',border:'white',background:'none'}} onClick={()=>onDelete(comment._id)}  type="button" className="w3-button w3-theme-d2 w3-margin-bottom">
          <i className="fa fa-trash" /> &nbsp;Delete Comment</button>}
        </div>
    </div>
      );
      
}