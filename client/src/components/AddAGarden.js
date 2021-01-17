import '../css/Forms.css'
import axios from 'axios'
import{Link, Redirect} from 'react-router-dom';
import logo from '../Images/LB.png'; 
import React from 'react';

export default function AddAGarden({user,setUser}){
  const inputRef=React.useRef();


  return (
    <div>

      <section id="hero" className="d-flex align-items-center">
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
  
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first">
              
                <h4 style= {{fontSize: '20px', color:'#51361A'}}>Add A Garden </h4> 
          
              </div>
              <form style= {{fontSize: '10px'}}  onSubmit={(e)=>{
                setUser({userName:inputRef.current.value})
              addAGarden(e)}}>
                <input style= {{fontSize: '12px'}} type="text"  id="name" className="fadeIn second" name="addAGarden" placeholder="Name" ref={inputRef} />
                <input style= {{fontSize: '12px'}} type="text" id="size" className="fadeIn second" name="addAGarden" placeholder="Size" ref={inputRef} />
                <p>Direction:</p>
                    <input type="radio" id="notrh" name="direction"  /> <label htmlFor="north">Notrh</label><br />
                    <input type="radio" id="west" name="direction"  /><label htmlFor="west">West</label><br />
                    <input type="radio" id="south" name="direction" /> <label htmlFor="south">South</label><br/>
                    <input type="radio" id="east" name="direction" /> <label htmlFor="east">East</label><br/>
                
                    <p>Surroundings:</p>
                    <input type="radio" id="outdoor" name="surroundings"  /> <label htmlFor="outdoor">Outdoor</label><br />
                    <input type="radio" id="indoor" name="surroundings"  /><label htmlFor="indoor"> Indoor</label><br />
                   
                    <p>Direct Sunlight:</p>
                    <input type="radio" id="yes_sunlight" name="sunlight"  /> <label htmlFor="yes_sunlight">Yes</label><br />
                    <input type="radio" id="no_sunlight" name="sunlight"  /><label htmlFor="no_sunlight"> No</label><br />
                   
                <input type="submit" className="fadeIn fourth" defaultValue="addAGarden" value="Add"/><br/>
              </form>
             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  }
   

function addAGarden(e){
/*
  e.preventDefault();
  const newUser= { 
      'firstName':document.getElementById('first_name').value ,
      'lastName': document.getElementById('last_name').value ,
      'email': document.getElementById('email').value ,
      'password': document.getElementById('password').value ,
  }
  console.log(newUser);
  axios.post('http://localhost:8080/user/register',newUser).then((Response)=>{console.log(Response.data)})
  
  
  //to test user update
  //axios.post('http://localhost:8080/user/update',newUser)


  
  //need to add post to server//////

}*/}

