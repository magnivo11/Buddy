import '../css/Forms.css'
import axios from 'axios'
import{ Redirect,useHistory} from 'react-router-dom';
import React from 'react';
 
export default function AddAGarden(){
  const[gardenAdded,setGardenAdded]=React.useState(false)
  const userId= window.sessionStorage.getItem('userID');
  const history = useHistory();

  return (
    <div>
    <section id="hero" className="d-flex align-items-center" style={{overflow:'scroll'}}>
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
  
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first">
              
                <h4 style= {{fontSize: '20px', color:'#51361A'}}>Add A Garden </h4> 
          
              </div>
              <form name='gardenForm' style= {{fontSize: '10px'}}  onSubmit={(e)=>{
              addAGarden(e,userId)
            history.push('/myGardens')
            }}>
                <input style= {{fontSize: '12px'}} type="text"  id="name" className="fadeIn second" name="addAGarden" placeholder="Name"  />
                <p>Direction:</p>
                <label className="radio-inline">
                    <input type="radio" id="north" name="direction"  /> <label htmlFor="north">North</label><br />
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
                <input type="submit" className="fadeIn fourth"  value="Add"/><br/>
              </form>
             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
              
  }
   

function addAGarden(e,userId){

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
  for(let i = 0; i <directions.length; i++){
    if(directions[i].checked){
      direction=directions[i].id;}}
    

  // getting surrounsings
  for(let i = 0; i <surroundings.length; i++){
    if(surroundings[i].checked){
      surrounding=surroundings[i].id;}}
  

  //getting sun light
  for(let i = 0; i <sunLight.length; i++){
    if(sunLight[i].checked){
      if(i==0){
        sunlight=true}
      else{
        sunlight=false}}}
 
 
    const newGarden= { 
    name:name,
    direction:direction,
    directSun :sunlight,
    surroundings:surrounding,
    userID:userId
  }

    axios.post('http://localhost:8080/garden/',newGarden);

}