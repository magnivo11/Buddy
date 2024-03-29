import React from "react"
import CommentsSection from "./CommentsSection";
import axios from 'axios';
import { Redirect} from 'react-router-dom';

export default function Comments({postId,postWriterID,deletePost}) {

    //check if post writes is the logged user by compering userId from session
    const [mobileMode, setMobileMode] = React.useState(false);

    React.useEffect(() => {
        if (window.innerWidth > 700){
            setMobileMode(true)
          }
      }, [postId]);
    const [isVisible, setIsVisible] = React.useState(false);
    const [comments, setComments] = React.useState([]);

    const toggleComments = () => {                
        if (!isVisible) {
            fetch(process.env.REACT_APP_SERVER_URL+'/comment/bypost/' + postId)
                .then(response => response.json()).then(
                    data => {setComments(data);
                    }
                )
        }
        setIsVisible(!isVisible);
    }
    const deleteComment=(commentID)=>{
        setComments(comments.filter((comment)=>(comment._id !==commentID)))
        axios.delete(process.env.REACT_APP_SERVER_URL+'/comment/',{data:{commentID:commentID,postID:postId}})
      }

    return (
        <>
            <button  style={mobileMode?{fontSize:'12px',border:'white',background:'none'}:{fontSize:'9px',border:'white',background:'none'}} onClick={toggleComments} type="button" 
            className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment" />&nbsp;Comments </button> &nbsp;
             {(isVisible) ? <CommentsSection comments={comments} onDelete={deleteComment} postId={postId} setComments={setComments} /> : ""}
        </>
    );
    

}
