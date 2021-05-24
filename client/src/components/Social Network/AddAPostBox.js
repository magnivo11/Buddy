import React,{inputRef,useRef} from 'react';
import {Link} from 'react-router-dom'


export default function AddAPostBox({target, usersFirstName,posts,setPosts}) {
    const inputRef = React.useRef(null);
    const userId= window.sessionStorage.getItem('userID');

    
    return (
        <div className="w3-row-padding">
            <p className="w3-center">
            <div className="w3-col m12">
                <div className="w3-card w3-round w3-white">
                <div className="w3-container w3-padding">  
                <form name='postForm' style= {{fontSize: '10px', textAlign:'center',border:'black'}}  onChange={(e)=>{
                               

            }}>
              <div className="addPost">
              <Link className="nav-link"  to={`/addapost/${userId}`}>
                <input  type="text" ref={inputRef} placeholder={ usersFirstName+", what's on your mind?"} ></input>       </Link>        
                <br></br>
                <label className="radio-inline">
                <p>Status:</p>
                  </label>
                    <label className="radio-inline">
                    <input type="radio" id='green' name="status" /> <label style={{color:'green'}}htmlFor="south">Tip</label><br/>
                  </label> 

                    <label className="radio-inline">
                    <input type="radio" id='orange' name="status"  /><label style={{color:'orange'}} htmlFor="west">Question</label><br />
                    </label>    
                    <label className="radio-inline">
                <input  type="radio" id='red' name="status"  /> <label style={{color:'red'}} htmlFor="north">Help &nbsp;&nbsp;</label><br />
                  </label> 
                </div>
              </form>  
                 
                 </div>
                </div>
            </div>
            </p>

        </div>
    );
}
