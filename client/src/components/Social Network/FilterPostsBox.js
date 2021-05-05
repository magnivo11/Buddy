 import React,{inputRef,useState,useRef} from 'react';

export default function FilterPostsBox({posts, setPosts}) {

  const [Allposts,setAllPosts]=React.useState([]);

  React.useEffect(() => {
  fetch('http://localhost:8080/post')
    .then(response => response.json()).then(
      data => {setAllPosts(data)
      }
    )
}, []);
const [status, setStatus] = React.useState("")

const handleStatusChange = (event) => {
  setStatus(event.target.value);
}

      return (
        <div className="w3-row-padding">
            <p className="w3-center">
            <div className="w3-col m12">
                <div className="w3-card w3-round w3-white">
                <div className="w3-container w3-padding"> 
            
              <form name='filterForm' style= {{fontSize: '10px', textAlign:'center',border:'black'}}   onSubmit={(e)=>{
              filterPosts(e,status,setPosts,Allposts)
            }}>
                <div className="filterPosts">
                 <a>
                 Filter posts by status:&nbsp;
                  <select value={status} onChange={handleStatusChange}>
                    <option style={{color:'green'}}value="green" >Green</option>
                    <option style={{color:'orange'}}value="orange">Yellow</option>
                    <option style={{color:'red'}}value="red">Red</option>
                  </select>
                </a> &nbsp;&nbsp;
                  <button  style={{border:'white'}} type="submit" className="w3-button w3-theme-d2 w3-margin-bottom"> Filter</button> &nbsp;
              </div>
              </form>  
                  
                 </div>
                </div>
            </div>
            </p>

        </div>
      );
    }
    
function filterPosts(e,status,setPosts,Allposts){
  e.preventDefault();
    setPosts(Allposts.filter((post)=>(post.status ===status)))
}