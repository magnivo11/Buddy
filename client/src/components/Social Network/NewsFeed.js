import React from 'react';
import axios from 'axios';
import AddAPostBox from './AddAPostBox'
import PostList from './PostList'
import FilterPostsBox from './FilterPostsBox';
import '../../css/SocialNetworkProfile.css'


export default function NewsFeed(){

  //user id from url
  const userID = window.sessionStorage.getItem('userID');
  const [currentUser,setUser]=React.useState({_id:'',firstName:'',lastName:''});
  const [posts,setPosts]=React.useState([]);
  const [change,setChange]=React.useState(false);

  const deletePost=(postID)=>{
    if (window.confirm('Are you sure you want to delete this post?')){
      setPosts(posts.filter((post)=>(post !==postID)))
      axios.delete(process.env.REACT_APP_SERVER_URL+'/post/',{data:{postID:postID,userID:userID}})
      window.location='/newsfeed'
      }
  }

  React.useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL+'/user/'+userID)
      .then(response => response.json()).then(
        data => {setUser(data)})
      
  }, []);
  React.useEffect(() => {
  axios.get(process.env.REACT_APP_SERVER_URL+'/post').then(Response => {
    if (posts.length != Response.data.length)
    {
      const postIDList = Response.data.map((post)=>(post._id));
      postIDList.reverse();
      setPosts(postIDList);
      setChange(false);
    }
})  }, []);

console.log(posts)
    return (
    <section id="hero"  style={{overflow:'scroll'}} >
      <section  style={{backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}> 
        <div data-aos="fade-up"  >
          <link rel="stylesheet" href="//cdn.materialdesignicons.com/3.7.95/css/materialdesignicons.min.css" />
            <div style={{ width:'96%'}} className="container bootdey">
              <div className="section-title" >
                <h2 style={{fontSize:'36px'}}>News Feed</h2>
               </div>
              <div style={{fontFamily: "Open Sans"}}>

                <div className="col-md-12 bootstrap snippets">
                  <div className="panel">
                    <div className="panel-body">
                      <AddAPostBox posts={posts} usersFirstName= {currentUser.firstName} setPosts={setPosts}/>
                        <br></br>
                        <FilterPostsBox posts={posts} setPosts={setPosts}/>
                        <PostList posts={posts} change={change} deletePost={deletePost}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           </div>
         </section>
       </section> 
    );
    }
   