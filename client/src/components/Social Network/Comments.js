import React from "react"
import CommentsSection from "./CommentsSection";
import axios from 'axios';
import { Redirect} from 'react-router-dom';

export default function Comments({postId,postWriterID,deletePost}) {

    //check if post writes is the logged user by compering userId from session
    const [deletePermission, setDeletePermission] = React.useState(false);
    const userIDfromSession= window.sessionStorage.getItem('userID');
    React.useEffect(() => {
         if (userIDfromSession==postWriterID)
         setDeletePermission(true);

      }, [postId]);
    const [isVisible, setIsVisible] = React.useState(false);
    const [comments, setComments] = React.useState([]);

    const toggleComments = () => {                
        if (!isVisible) {
            fetch('http://localhost:8080/comment/bypost/' + postId)
                .then(response => response.json()).then(
                    data => {setComments(data);
                    }
                )
        }
        setIsVisible(!isVisible);
    }
    const deleteComment=(commentID)=>{
        setComments(comments.filter((comment)=>(comment._id !==commentID)))
        axios.delete('http://localhost:8080/comment/',{data:{commentID:commentID,postID:postId}})
      }

    return (
        <>
            <button  style={{fontSize:'10px',border:'white',background:'none'}} onClick={toggleComments} type="button" 
            className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment" />&nbsp;Comments </button> &nbsp;
             {(isVisible) ? <CommentsSection comments={comments} onDelete={deleteComment} postId={postId} setComments={setComments} /> : ""}
        </>
    );
    

}
