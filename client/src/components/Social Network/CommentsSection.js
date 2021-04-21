import React from "react"
import Comment from "./Comment";

export default function CommentsSection({ comments, postId, onDelete,setComments }) {
    const loggedUserId= window.sessionStorage.getItem('userID');
    const onClick = () => {
        fetch('http://localhost:8080/comment/', {
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
                    fetch('http://localhost:8080/comment/bypost/' + postId)
                        .then(response => response.json()).then(
                            data => {
                                console.log("comments")
                                console.log(data)
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
            <input ref={inputRef} placeholder="new comment" className="w3-border w3-padding w3-input w3-margin-bottom" />
            <button style={{fontSize:'14px', border:'white', background:'none'}} onClick={onClick} type="button" className="w3-button w3-theme-d1 w3-margin-bottom">  <i className="fa fa-plus" /></button>
            {comments.map((data, key) => {
                return <Comment comment={data} onDelete={onDelete} key={key} />
            })}
        </>
    );
}