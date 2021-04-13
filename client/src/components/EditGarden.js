import '../css/Forms.css'
import axios from 'axios'
import{ Redirect,useHistory} from 'react-router-dom';
 import React from 'react';
 
export default function EditGarden(){
  var index=window.location.toString().lastIndexOf('/')+1
  const gardenID=window.location.toString().substring(index)
  const[gardenEdited,setGardenEdited]=React.useState(false)
  const history = useHistory();
  const [garden,setGarden]=React.useState({_id:''});

  React.useEffect(() => {
    fetch('http://localhost:8080/garden/find/'+gardenID)
      .then(response => response.json()).then(
        data => {
          setGarden(data);
        }
      )
  }, []);

  const gardenName = garden.name;


  return (
    <div style={{fontFamily: "Open Sans"}}>
      <section id="hero" className="d-flex align-items-center">
         <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
         <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first"><br/>
              <h1 style={{fontSize: '35px', color:'#51361A'}} >Edit Garden </h1> 
              </div>
              <form name='gardenForm' style= {{fontSize: '10px'}}  onSubmit={(e)=>{
              editGarden(e,gardenName,gardenID)
              history.push('/mygardens')
            }}>
                <input style= {{fontSize: '12px'}} type="text"  id="name" className="fadeIn second" name="addAGarden" placeholder={gardenName}  />
                <p>Direction:</p>
                <label className="radio-inline">
                    <input type="radio" id="north" name="direction"  /><label htmlFor="north">North</label><br />
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
                   <button style={{width:'120px',background: '#84996f'}}className="button" type="submit"><span>Save</span></button>
              </form>
             
             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
              
  }
   

function editGarden(e,gardenName,gardenID){

  e.preventDefault();
  const form = document.forms.gardenForm;
  const directions = form.elements.direction;
  const surroundings=form.elements.surroundings
  const sunLight=form.elements.sunlight
  var direction;
  var surrounding;
  var sunlight;
  //getting name and size
  var name;
  if(document.getElementById('name').value.length==0) name=gardenName;
  else name = document.getElementById('name').value;

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
  id:gardenID,
  direction:direction,
  directSun :sunlight,
  surroundings:surrounding,
  }
 
  axios.put('http://localhost:8080/garden/',newGarden);

 

  


}