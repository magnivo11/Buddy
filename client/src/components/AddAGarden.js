import '../css/Forms.css'
import axios from 'axios'
import{Link, Redirect} from 'react-router-dom';
import logo from '../Images/LB.png'; 
import React from 'react';
import DataContext from '../DataContext'

export default function AddAGarden(){
  const[gardenAdded,setGardenAdded]=React.useState(false)
  const user=React.useContext(DataContext);
 
if(!gardenAdded){

  return (
    <div>

      <section id="hero" className="d-flex align-items-center">
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
  
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first">
              
                <h4 style= {{fontSize: '20px', color:'#51361A'}}>Add A Garden </h4> 
          
              </div>
              <form name='gardenForm' style= {{fontSize: '10px'}}  onSubmit={(e)=>{
              addAGarden(e,user)
              setGardenAdded(true)
            }}>
                <input style= {{fontSize: '12px'}} type="text"  id="name" className="fadeIn second" name="addAGarden" placeholder="Name"  />
                <p>Direction:</p>
                <label className="radio-inline">
                    <input type="radio" id="notrh" name="direction"  /> <label htmlFor="north">Notrh</label><br />
                  </label>
                    <label className="radio-inline">
                    <input type="radio" id="west" name="direction"  /><label htmlFor="west">West</label><br />
                    </label>
                    <label className="radio-inline">
                    <input type="radio" id="south" name="direction" /> <label htmlFor="south">South</label><br/>
                  </label>
                    <label className="radio-inline">
                    <input type="radio" id="east" name="direction" /> <label htmlFor="east">East</label><br/>
                    </label>                
                    <p>Surroundings:</p>
                    <label className="radio-inline">
                    <input type="radio" id="outdoor" name="surroundings"  /> <label htmlFor="outdoor">Outdoor</label><br />
                    </label>
                    <label className="radio-inline">
                    <input type="radio" id="indoor" name="surroundings"  /><label htmlFor="indoor"> Indoor</label><br />
                   </label>
                    <p>Direct Sunlight:</p>
                    <label className="radio-inline">
                    <input type="radio" id="yes_sunlight" name="sunlight"  /> <label htmlFor="yes_sunlight">Yes</label><br />
                    </label>
                    <label className="radio-inline">
                    <input type="radio" id="no_sunlight" name="sunlight"  /><label htmlFor="no_sunlight"> No</label><br />
                   </label>
                   <br></br>
                   <br></br>
                <input type="submit" className="fadeIn fourth" defaultValue="addAGarden" value="Add"/><br/>
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
   

function addAGarden(e,user){

  e.preventDefault();
  const form = document.forms.gardenForm;
  const directions = form.elements.direction;
  const surroundings=form.elements.surroundings
  const sunLight=form.elements.sunlight
  var direction;
  var surrounding;
  var sunlight;
  //getting name and size
  const name=document.getElementById('name').value;
  //getting direction
  for(var i = 0; i <directions.length; i++)
    if(directions[i].checked)
    direction=directions[i].id;
    

      // getting surrounsings
      for(var i = 0; i <surroundings.length; i++)
      if(surroundings[i].checked)
      surrounding=surroundings[i].id;
  

     //getting sun light
     for(var i = 0; i <sunLight.length; i++)
     if(sunLight[i].checked)
     if(i==0)
     sunlight=true
     else
     sunlight=false
 
 
     const newGarden= { 
    name:name,
    direction:direction,
    directSun :sunlight,
    surroundings:surrounding,
    userID:user._id
  }
  console.log(newGarden);
    axios.post('http://localhost:8080/garden/',newGarden).then(garden=>{
      axios.put('http://localhost:8080/user/addGarden',{garden:garden.data,userID:user._id})

    })

 

  


}