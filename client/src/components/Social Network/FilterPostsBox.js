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
const onClick=(color)=>{
    filterPosts(color,setPosts,Allposts);
}

function filterPosts(e,setPosts,Allposts){
   e.preventDefault();
  const form = document.forms.filterForm;
  const statusArray = form.elements.status;
  var status;

  //getting status
  for(var i = 0; i <statusArray.length; i++){
    if(statusArray[i].checked){
        status=statusArray[i].id;
      }
    };
    if(status!='nofilter')
     setPosts(Allposts.filter((post)=>(post.status ===status)))
     else
     setPosts(Allposts)
}
      return (


        <div className="w3-row-padding">
            <p className="w3-center">
            <div className="w3-col m12">
                <div className="w3-card w3-round w3-white">
                <div className="w3-container w3-padding"> 
                <div className="example-wrapper">
          </div>
  
              <form name='filterForm' style= {{fontSize: '10px'}}  onSubmit={(e)=>{
              filterPosts(e,setPosts,Allposts)
            }}>
                <label className="radio-inline">
                <p style={{fontSize:'14px'}}>Filter by status:</p>
                  </label>

                    <label className="radio-inline">
                    <input style={{backgroundColor:'red'}} type="radio" id='green' name="status" /> <label style={{color:'green'}}htmlFor="south">Green</label><br/>
                  </label> 

                    <label className="radio-inline">
                    <input type="radio" id='orange' name="status"  /><label style={{color:'orange'}} htmlFor="west">Yellow</label><br />
                    </label>    
                    <label className="radio-inline">
                <input  type="radio" id='red' name="status"  /> <label style={{color:'red'}} htmlFor="north">Red</label><br />
                  </label>       
                  <label className="radio-inline">
                <input  type="radio" id='nofilter' name="status"  /> <label style={{color:'black'}} htmlFor="north">No filter&nbsp;&nbsp;</label><br />
                  </label>     
                   <button  style={{fontSize:'12px', border:'none'}} type="submit" className="w3-button w3-theme-d2 w3-margin-bottom">Filter</button> &nbsp;
              </form>  
                  
                 </div>
                </div>
            </div>
            </p>

        </div>
      );
    }