import '../../css/SocialNetworkProfile.css'
import React from 'react';
import{Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import AddAPostBox from './AddAPostBox'
import PostList from './PostList'
import userPhoto from '../../Images/user.png'


export default function Profile(){
    //user id from url - users profile
    var index=window.location.toString().lastIndexOf('/')+1
    const userID=window.location.toString().substring(index)
    //user id from session - logged user
    const userIDfromSession = window.sessionStorage.getItem('userID');

    const [currentUser,setUser]=React.useState({_id:'',firstName:'',lastName:''});
    const [posts,setPosts]=React.useState([]);
    //change state to inform a change was made in the posts list
    const [change,setChange]=React.useState(false);
    //to check editing permissions - we will check if user id from session is equal to user id from url address
    const [editPermission,setEditPermission]=React.useState(false);


   const editPost =(postID,content,status)=>{
     axios.put(process.env.REACT_APP_SERVER_URL+'/post/',{data:{postID:postID,content:content,status:status}})
  }
  const deletePost=(postID,postPhotoName)=>{
    if (window.confirm('Are you sure you want to delete this post?')){
      setPosts(posts.filter((post)=>(post !==postID)))
      axios.delete(process.env.REACT_APP_SERVER_URL+'/post/',{data:{postID:postID,userID:userID}})
      if(postPhotoName)
      axios.delete(process.env.REACT_APP_SERVER_URL+'/photo/', { data: { photoID: postPhotoName} })

      }
  }

    //fetching user information from server
    React.useEffect(() => {
      fetch(process.env.REACT_APP_SERVER_URL+'/user/'+userID)
        .then(response => response.json()).then(
          data => {
            setUser(data);
            if(userIDfromSession==userID)
              setEditPermission(true)
          }
        )
    }, []);

    axios.get(process.env.REACT_APP_SERVER_URL+'/user/allposts/'+userID).then(Response => {
      if (posts.length != Response.data.length)
          setPosts(Response.data)
  })

  //not copied
  function isStringCharsValueSumIsPrime(s) {
    var sum=0;
    for (var i=0;i<s.length;i++)
    {
     //changing all letters to upper case , summing the ascii sum and substracting the redundant (for example-> A=44 in ascii, minus 43 is 1)
      sum+=s.toUpperCase().charCodeAt(i)-43
    }
    if (isPrime(sum))return true;
    return false;
  }
  //copied from stackoverflow
  function isPrime(num) {
    for(var i = 2; i < num; i++)
      if(num % i === 0) return false;
    return num > 1;
  }
return(
    <section id="hero"  style={{overflow:'scroll'}} >
    <section  style={{backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}> 
    <div data-aos="fade-up"  >

    <div style={{fontFamily: "Open Sans"}}>
    <link rel="stylesheet" href="//cdn.materialdesignicons.com/3.7.95/css/materialdesignicons.min.css" />
    <div style={{ width:'98%'}} className="container">
    <div className="section-title" >
            <h2 style={{fontSize:'36px'}}>Profile</h2>
        </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-4">
                  <div className="border-bottom text-center pb-4">
                    {currentUser.photoID?
                    <img style={{width:'180px',height:'180px',objectFit:"cover"}} src={process.env.REACT_APP_SERVER_URL+`/photo/find/${currentUser.photoID}`} alt="profile" className="img-lg rounded-circle mb-3" />:
                    <img style={{width:'150px'}} src={userPhoto} alt="profile" className="img-lg rounded-circle mb-3" />}


                    <div className="mb-3">
                      <h3 style={{fontSize:'33'}}>{camelize(currentUser.firstName)+" "+camelize(currentUser.lastName)}</h3>
                      <div className="d-flex align-items-center justify-content-center">
                      {editPermission&& <Link className="w3-center"  to={`/edituser`}>
                      <i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme" style={{textAlign:'center'}} /> Edit My Profile</Link>}

                      </div>
                    </div>
                    <p className="w-75 mx-auto mb-3">{currentUser.description} </p>
                  </div>
                  <div className="border-bottom py-4">
                  </div>
                  <div className="py-4">
                    {currentUser.isAdmin &&<p className="clearfix">
                      <span className="float-left">
                        Type:
                      </span>
                      <span className="float-right text-muted">
                        Admin
                      </span>
                    </p>}
         
                    <p className="clearfix">
                      <span className="float-left">
                        Email:
                      </span>
                      <span className="float-right text-muted">
                      {currentUser.email}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-lg-8">
                <div className="profile-feed" style={{textAlign:'left'}}>
                <AddAPostBox posts={posts} target={"profile"}setPosts={setPosts} usersFirstName= {currentUser.firstName} change={change} setChange={setChange}/>
                <PostList posts={posts} change={change} editPost={editPost} deletePost={deletePost}/>
                   
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
function camelize(str) {
  if (str)
  return str.charAt(0).toUpperCase() + str.slice(1);
  else 
  return "";
}