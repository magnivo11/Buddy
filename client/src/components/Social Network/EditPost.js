import '../../css/Forms.css'
import axios from 'axios'
import {useHistory } from 'react-router-dom';
import React from 'react';

export default function EditGarden() {
  var index = window.location.toString().lastIndexOf('/') + 1
  const postID = window.location.toString().substring(index)
  const history = useHistory();
  const [post, setPost] = React.useState();
  const [content, setContent] = React.useState("");
  const [status, setStatus] = React.useState("")
  React.useEffect(() => {
    fetch('http://localhost:8080/post/' + postID)
      .then(response => response.json()).then(
        data => {
          setPost(data);
          setContent(data.content);
          setStatus(data.status);
        }
      )
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  }
  const handleContentChange = (event) => {
    setContent(event.target.value);
  }

  return (
    <div style={{ fontFamily: "Open Sans" }}>
      <section id="hero" className="d-flex align-items-center">
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first"><br />
                <h1 style={{ fontSize: '35px', color: '#51361A' }} >Edit Post </h1>
              </div>

              <form onSubmit={(e) => {
                editPost(e, status,content, postID,history)
              }}>
                <input style={{ fontSize: '12px' }} type="text" id="content" className="fadeIn second" name="addAGarden" placeholder={content}
                onChange={handleContentChange} />
                <br />
                <a>
                  Status:&nbsp;
                  <select value={status} onChange={handleStatusChange}>
                  <option value="orange">Question</option>
                    <option value="red">Help</option>
                    <option value="green">Look at me</option>
                  </select>
                </a>
                <br /><br />
             
               
                <br /><br />
                <button style={{ width: '120px', background: '#84996f' }} className="button" type="submit"><span>Save Changes</span></button> &nbsp;
                <button style={{ width: '120px', background: '#84996f' }} className="button" onClick={() => history.push('/mygardens')}><span>Cancel</span></button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}

function editPost(e, status,content, postID,history) {
  e.preventDefault();

  const updatedPost = {
    content:content,
    postID: postID,
    status: status,
  }

  axios.put('http://localhost:8080/post/', updatedPost);
  history.push('/newsfeed')
}
