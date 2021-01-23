import '../css/AddForms.css'
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
              <br></br>
                <h4 style= {{fontSize: '25px', color:'#51361A'}}>Add A Garden </h4> 
          
              </div>
              <form style= {{fontSize: '12px'}}  onSubmit={(e)=>{
                setUser({userName:inputRef.current.value})
              addAGarden(e)}}>
                <input style= {{fontSize: '14px'}} type="text"  id="name" className="fadeIn second" name="addAGarden" placeholder="Name" ref={inputRef} />
                <input style= {{fontSize: '14px'}} type="text" id="size" className="fadeIn second" name="addAGarden" placeholder="Size" ref={inputRef} />
                <p style= {{fontSize: '14px'}} >Direction:</p>
                  <label className="radio-inline">
                      <input type="radio" name="notrh" /><label htmlFor="notrh">North</label> </label>
                  <label className="radio-inline">
                    <input type="radio" name="west"  /><label htmlFor="notrh">West</label> </label>
                  <label className="radio-inline">
                    <input type="radio" name="south"  /><label htmlFor="notrh">South</label> </label>
                  <label className="radio-inline">
                    <input type="radio" name="east"  /><label htmlFor="notrh">East</label>  </label>
                  <br></br>
                  <br></br>

                  <p style= {{fontSize: '14px'}} >Surroundings:</p>
                  <label className="radio-inline">
                      <input type="radio" name="outdoor" /><label htmlFor="outdoor">Outdoor</label> </label>
                  <label className="radio-inline">
                    <input type="radio" name="indoor"  /><label htmlFor="indoor">Indoor</label> </label>
                    <br></br>
                    <br></br>

                    <p style= {{fontSize: '14px'}} >Direct Sunlight:</p>
                  <label className="radio-inline">
                      <input type="radio" name="yes_sunlight" /><label htmlFor="yes_sunlight">Yes</label> </label>
                  <label className="radio-inline">
                    <input type="radio" name="no_sunlight"  /><label htmlFor="no_sunlight">No</label> </label>
               <br></br>
               <br></br>
                <input type="submit" className="fadeIn fourth" defaultValue="addAGarden" value="Add Garden"/><br/>
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

