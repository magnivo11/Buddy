import '../css/AddForms.css'
import '../css/AddAPlant.css';

import axios from 'axios'
import{Link, Redirect, useParams} from 'react-router-dom';
import logo from '../Images/LB.png'; 
import React from 'react';
import stage1 from '../Images/IconStages/stage 1.jpg';
import stage2 from '../Images/IconStages/stage 2.jpg';
import stage3 from '../Images/IconStages/stage 3.jpg';
import stage4 from '../Images/IconStages/stage 4.jpg';
import stage5 from '../Images/IconStages/stage 5.jpg';
 


export default function AddAPlantByUser(){
  var index=window.location.toString().lastIndexOf('/')+1
  const gardenID=window.location.toString().substring(index)
  const[plantAdded,setPlantAdded]=React.useState(false)
 
if(!plantAdded){

  return (
    <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        
      <section id="hero" className="d-flex align-items-center">
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
  
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first">
              <br></br>
                <h4 style= {{fontSize: '25px', color:'#51361A'}}>Add A Plant </h4> 
          
              </div>
              <form style= {{fontSize: '10px'}}  onSubmit={(e)=>{
              addAPlant(e)}}>
                <input style= {{fontSize: '14px'}} type="text"  id="name" className="fadeIn second" name="addAGarden" placeholder="Name" />
                <p style= {{fontSize: '14px'}} >Select you plant's initial stage:</p>

                  <label className="radio-inline">
                    <input type="radio" name="stage1"  />
                    <img src={stage1} width={40}></img>Seed
                  </label>
                
                  <label className="radio-inline">
                    <input type="radio" name="stage2"  />
                    <img src={stage2} width={40}></img>Seedling
                  </label>
                  <label className="radio-inline">
                    <input type="radio" name="stage3"  />
                    <img src={stage3} width={40}></img>Vegetative
                  </label>
                  <label className="radio-inline">
                    <input type="radio" name="stage4"  />
                    <img src={stage4} width={40}></img>Flowering

                  </label> <label className="radio-inline">
                    <input type="radio" name="stage5"  />
                    <img src={stage5} width={40}></img>Ripening
                  </label>
                    <br></br>
                    <br></br>

                <input type="submit" className="fadeIn fourth" defaultValue="addA" value="Add Plant"/><br/>
              </form>
             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
else{
  return(<Redirect to="/mygardens"/>);

}
  
}
   

function addAPlant(e){
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

 