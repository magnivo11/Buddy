import '../../css/Forms.css'
import axios from 'axios'
import React from 'react';

export default function EditPost() {
  var index = window.location.toString().lastIndexOf('/') + 1
  const postID = window.location.toString().substring(index)
  const userID= window.sessionStorage.getItem('userID');
  const [post, setPost] = React.useState();
  const [content, setContent] = React.useState("");
   const [photoID, setPhotoID] = React.useState("");
  const [status, setStatus] = React.useState("");

  const [FileName, setFileName] = React.useState("");

   React.useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL+'/post/' + postID)
      .then(response => response.json()).then(
        data => {
          setPost(data);
          setContent(data.content);
          setStatus(data.status);
           setPhotoID(data.photoID);

 
         }
      )
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  }
  const handleContentChange = (event) => {
    setContent(event.target.value);
  }

   const onChangeFile = e => {
    setFileName(e.target.files[0]);
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
                 editPost(e, status,content, postID,userID,FileName,photoID)
              }}>
                
 
                <input style={{ fontSize: '12px' }} type="text" id="content" className="fadeIn second" name="addAGarden" placeholder={content}
                onChange={handleContentChange} />
                <br />
                <a>
                  Status:&nbsp;
                  <select value={status} onChange={handleStatusChange}>
                  <option value="Tip">Tip</option>
                  <option value="Question">Question</option>
                  <option value="Help">Help</option>
                  </select>
                </a>
                <br /><br />
                 <div className="form-group" >
                    <input type="file" name='link' className="form-control-file" onChange={onChangeFile}></input>
                  </div>
                <br /><br />
                <button style={{ width: '120px', background: '#84996f' }} className="button" type="submit"><span>Save Changes</span></button> &nbsp;
                <button style={{ width: '120px', background: '#84996f' }} className="button" onClick={() => window.location='/mygardens'}><span>Cancel</span></button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}

function editPost(e, status,content,postID,userID,FileName,photoID) {

  e.preventDefault();

  var formData = new FormData();
  formData.append('link', FileName);
  formData.append('type', "post");
 
 axios.post(process.env.REACT_APP_SERVER_URL+'/photo/upload', formData);

  const updatedPost = {
    content:content,
    userID:userID,
    postID: postID,
     status: status,
    photoID: FileName.name
     status: status
   }

  axios.put(process.env.REACT_APP_SERVER_URL+'/post/', updatedPost);
  window.location='/newsfeed'
   axios.delete(process.env.REACT_APP_SERVER_URL+'/photo/', { data: { photoID: photoID} })
  
}

