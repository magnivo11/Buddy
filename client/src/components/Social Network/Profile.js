import '../../css/SocialNetworkProfile.css'
import React from 'react';
import{Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import AddAPostBox from './AddAPostBox'
import PostList from './PostList'

export default function Profile(){
    //user id from url - users profile
    var index=window.location.toString().lastIndexOf('/')+1
    const userID=window.location.toString().substring(index)
    //user id from session - logged user
    const userIDfromSession = window.sessionStorage.getItem('userID');

    const [currentUser,setUser]=React.useState({_id:'',name:'',lastName:''});
    const [posts,setPosts]=React.useState([]);
    //change state to inform a change was made in the posts list
    const [change,setChange]=React.useState(false);
    //to check editing permissions - we will check if user id from session is equal to user id from url address
    const [editPermission,setEditPermission]=React.useState(false);

  const deletePost=(postID)=>{
    setPosts(posts.filter((post)=>(post !==postID)))
    axios.delete('http://localhost:8080/post/',{data:{postID:postID,userID:userID}})
  }

    //fetching user information from server
    React.useEffect(() => {
      fetch('http://localhost:8080/user/'+userID)
        .then(response => response.json()).then(
          data => {
            setUser(data);
            if(userIDfromSession==userID)
              setEditPermission(true)
          }
        )
    }, []);

          //fetching posts information from server - will re-render according to a change in "change" var
    React.useEffect(() => {
      fetch('http://localhost:8080/user/allposts/'+userID)
        .then(response => response.json()).then(
          data => {
            setPosts(data);
            console.log(data);
          }
        )
    }, []);
return(
    <section id="hero"  style={{overflow:'scroll'}} >
    <section  style={{backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}> 
    <div data-aos="fade-up"  >

    <div style={{fontFamily: "Open Sans"}}>
    <link rel="stylesheet" href="//cdn.materialdesignicons.com/3.7.95/css/materialdesignicons.min.css" />
    <div style={{ width:'98%'}} className="container">
    <div className="section-title" >
            <h2 style={{fontSize:'36px'}}>My Profile</h2>
        </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-4">
                  <div className="border-bottom text-center pb-4">
                    <img style={{width:'75%'}}src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="profile" className="img-lg rounded-circle mb-3" />
                    <div className="mb-3">
                      <h3 style={{fontSize:'33'}}>{currentUser.name+" "+currentUser.lastName}</h3>
                      <div className="d-flex align-items-center justify-content-center">
                      {editPermission&& <Link className="w3-center"  to={`/edituser/${userID}`}>
                      <i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme" style={{textAlign:'center'}} /> Edit My Profile</Link>}

                      </div>
                    </div>
                    <p className="w-75 mx-auto mb-3">{currentUser.description} </p>
                  </div>
                  <div className="border-bottom py-4">
                  </div>
                  <div className="py-4">
                    <p className="clearfix">
                      <span className="float-left">
                        Status
                      </span>
                      <span className="float-right text-muted">
                        Active
                      </span>
                    </p>
         
                    <p className="clearfix">
                      <span className="float-left">
                        Email
                      </span>
                      <span className="float-right text-muted">
                      {currentUser.email}
                      </span>
                    </p>


                  </div>
                  <button className="btn btn-primary btn-block mb-2">Send a message</button>
                </div>
                <div className="col-lg-8">
                <div className="profile-feed" style={{textAlign:'left'}}>
                <AddAPostBox posts={posts} setPosts={setPosts} usersFirstName= {currentUser.name} change={change} setChange={setChange}/>
                <PostList posts={posts} change={change} deletePost={deletePost}/>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</section>
</section>
)
}