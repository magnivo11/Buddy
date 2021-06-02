import React from "react"
import Comment from "./Comment";

export default function CommentsSection({ comments, postId, onDelete,setComments }) {
    const loggedUserId= window.sessionStorage.getItem('userID');
    const onClick = () => {
        fetch(process.env.REACT_APP_SERVER_URL+'/comment/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userID: loggedUserId,
                content: inputRef.current.value,
                postID: postId
            })
        }).then(response => response.json()).then(
            data => {
                if (data) {
                    inputRef.current.value = '';
                    fetch(process.env.REACT_APP_SERVER_URL+'/comment/bypost/' + postId)
                        .then(response => response.json()).then(
                            data => {
                                setComments(data)}
                        )
                }
            }
        )
    }

    const inputRef = React.useRef(null);

    return (
        <>
        <br></br><br></br>
            <input className="newComment" ref={inputRef} placeholder="new comment"  />
            <button style={{fontSize:'10px', border:'white', background:'none'}} onClick={onClick} type="button" >  <i className="fa fa-plus" /></button>
            {comments.map((data, key) => {
                return <Comment comment={data} onDelete={onDelete} key={key} />
            })}
        </>
    );
}