import axios from 'axios'
import{ Redirect} from 'react-router-dom';
import React,{inputRef,useRef} from 'react';


export default function AddAPostBox({usersFirstName,posts,setPosts,change,setChange}) {
    const inputRef = React.useRef(null);
    const userId= window.sessionStorage.getItem('userID');

    return (
        <div className="w3-row-padding">
            <p className="w3-center">

            <div className="w3-col m12">
                <div className="w3-card w3-round w3-white">
                <div className="w3-container w3-padding">  
                <form name='postForm' style= {{fontSize: '10px', textAlign:'center',border:'black'}}  onSubmit={(e)=>{
              addAPost(e,inputRef,userId,posts,setPosts,change,setChange)
            }}>
                <input style= {{fontSize: '14px'}} type="text" ref={inputRef} placeholder={"Hey "+usersFirstName+", what's on your mind?"} className="fadeIn second" />            
                <br></br>
                <label className="radio-inline">
                <p style={{fontSize:'14px'}}>Status:</p>
                  </label>

                    <label className="radio-inline">
                    <input type="radio" id='green' name="status" /> <label style={{fontSize:'11px',color:'green'}}htmlFor="south">Look at me</label><br/>
                  </label> 

                    <label className="radio-inline">
                    <input type="radio" id='orange' name="status"  /><label style={{fontSize:'11px',color:'orange'}} htmlFor="west">Question</label><br />
                    </label>    
                    <label className="radio-inline">
                <input  type="radio" id='red' name="status"  /> <label style={{fontSize:'11px',color:'red'}} htmlFor="north">Help &nbsp;&nbsp;</label><br />
                  </label>          
                   <button  style={{fontSize:'12px' ,border:'white'}} type="submit" className="w3-button w3-theme-d2 w3-margin-bottom"> Post</button> &nbsp;
              </form>  
                 
                 </div>
                </div>
            </div>
            </p>

        </div>
    );
}


function addAPost(e,inputRef,userId,posts,setPosts,change,setChange){

    e.preventDefault();
    const form = document.forms.postForm;
    const statusArray = form.elements.status;
    var status;
  
    //getting content
    const content=inputRef.current.value;
    //getting status
    for(var i = 0; i <statusArray.length; i++){
      if(statusArray[i].checked){
          status=statusArray[i].id;}}
   
      const newPost= { 
      content:content,
      status:status,
      userID:userId
    }

      axios.post('http://localhost:8080/post/',newPost).then(data=>
      {inputRef.current.value="";
        // const newPostArray = [...posts];
        // newPostArray.splice(0, 0, data.data._id);
        // console.log(newPostArray)
        // setPosts(newPostArray);
        const newArray = [data.data._id].concat([...posts])
        setPosts(newArray);
      });
      
  
  }
  
