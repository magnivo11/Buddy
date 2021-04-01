import '../css/AddForms.css'
import '../css/AddAPlant.css';

import axios from 'axios'
import{Link, Redirect} from 'react-router-dom';
import logo from '../Images/LB.png'; 
import React from 'react';
import DataContext from '../DataContext'


export default function EditPlantByAdmin(){
  var index=window.location.toString().lastIndexOf('/')+1
  const plantID=window.location.toString().substring(index)
  const[plantEdited,setPlantEdited]=React.useState(false)
  const [plant,setPlant]=React.useState({_id:''});
  if(plant._id!=plantID)
  axios.get('http://localhost:8080/plant/'+plantID).then((Response)=> {
    if(Response.data){

    if(plant._id!=Response.data._id)
    {
      setPlant(Response.data);
    }
  }
  })
if(!plantEdited){
  return (
    <div>

    <section id="hero" className="d-flex align-items-center">
      <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>

        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first">
            
              <h4 style= {{fontSize: '20px', color:'#51361A'}}>Edit Plant- Admin </h4> 
        
            </div>
            <form name='gardenForm' style= {{fontSize: '10px'}}  onSubmit={(e)=>{
            editPlantByAdmin(e,plant.species,plant.irrigationInstructors,plant.optimalTemp,plant.optimalSunExposure,
              plant.optimalSoilMoisture,plant.description,plantID)
            setPlantEdited(true)
          }}>
              <input style= {{fontSize: '12px'}} type="text"  id="species" className="fadeIn second"  placeholder="Species"  />
              <input style= {{fontSize: '12px'}} type="text"  id="irrigationInstructors" className="fadeIn second"  placeholder={plant.irrigationInstructors}  />
              <input style= {{fontSize: '12px'}} type="number"  id="optimalTemp" className="fadeIn second"  placeholder={plant.optimalTemp}  />
              <br></br>               <br></br>
              <input style= {{fontSize: '12px', hight:'50px'}} type="number"  id="optimalSunExposure" className="fadeIn second"  placeholder={plant.optimalSunExposure}  />
              <br></br>               <br></br>

              <input style= {{fontSize: '12px'}} type="number"  id="optimalSoilMoisture" className="fadeIn second"  placeholder={plant.optimalSoilMoisture}  />
              <input style= {{fontSize: '12px'}} type="text"  id="description" className="fadeIn second"  placeholder={plant.description}  />
               <input type="submit" className="fadeIn fourth"  value="Save"/><br/>
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
function editPlantByAdmin(e,species,irrigationInstructors,optimalTemp,optimalSunExposure,
  optimalSoilMoisture,description,plantID){

    var species;
    var irrigationInstructors;
    var optimalTemp;
    var optimalSunExposure;
    var optimalSoilMoisture;
    var description;

    if (document.getElementById('species').value.length==0) species= species;
      else species=document.getElementById('species').value;
    if (document.getElementById('irrigationInstructors').value.length==0) irrigationInstructors= irrigationInstructors;
      else irrigationInstructors=document.getElementById('irrigationInstructors').value;
    if (document.getElementById('optimalTemp').value.length==0) optimalTemp= optimalTemp;
      else optimalTemp=document.getElementById('optimalTemp').value;
      if (document.getElementById('optimalSunExposure').value.length==0) optimalSunExposure= optimalSunExposure;
      else optimalSunExposure=document.getElementById('optimalSunExposure').value;
    if (document.getElementById('optimalSoilMoisture').value.length==0) optimalSoilMoisture= optimalSoilMoisture;
      else optimalSoilMoisture=document.getElementById('optimalSoilMoisture').value;
      if (document.getElementById('description').value.length==0) description= description;
      else description=document.getElementById('description').value;
  e.preventDefault();

  const newPlant= { 
  id:plantID,
  species:species,
  irrigationInstructors:irrigationInstructors,
  optimalTemp:optimalTemp,
  optimalSunExposure:optimalSunExposure,
  optimalSoilMoisture:optimalSoilMoisture,
  description:description
  }
    axios.put('http://localhost:8080/plant/byadmin',newPlant);
}