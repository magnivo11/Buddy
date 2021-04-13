import '../css/AddForms.css'
import '../css/AddAPlant.css';

import axios from 'axios'
import{ Redirect,useHistory} from 'react-router-dom';
 import React from 'react';
 

export default function EditPlantByAdmin(){
  var index=window.location.toString().lastIndexOf('/')+1
  const plantID=window.location.toString().substring(index)
  const [plant,setPlant]=React.useState({_id:''});
  const history = useHistory();

  React.useEffect(() => {
    fetch('http://localhost:8080/plant/'+plantID)
      .then(response => response.json()).then(
        data => {
          setPlant(data);
        }
      )
  }, []);

  return (
    <div  style={{fontFamily: "Open Sans"}}>
    <section id="hero" className="d-flex align-items-center">
      <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first">
            <h1 style={{fontSize: '35px', color:'#51361A'}} >Edit Plant </h1> 
            </div>
            <form name='gardenForm' style= {{fontSize: '10px'}}  onSubmit={(e)=>{
            editPlantByAdmin(e,plant.species,plant.irrigationInstructors,plant.optimalTemp,plant.optimalSunExposure,
              plant.optimalSoilMoisture,plant.description,plantID)
            history.push('/PlantsBible')
            }}>
              <input style= {{fontSize: '12px'}} type="text"  id="species" className="fadeIn second"  placeholder={'Species: '+ plant.species}  />
              <input style= {{fontSize: '12px'}} type="text"  id="irrigationInstructors" className="fadeIn second"  placeholder={'Irrigation Instructors: '+ plant.irrigationInstructors}  />
              <input style= {{fontSize: '12px'}} type="text"  id="description" className="fadeIn second"  placeholder={'Description: '+plant.description}  />

              <input style= {{fontSize: '12px'}} type="number"  id="optimalTemp" className="fadeIn second"  placeholder={'Optimal Temperature: '+plant.optimalTemp}  /><br></br><br></br>
              <input style= {{fontSize: '12px', hight:'50px'}} type="number"  id="optimalSunExposure" className="fadeIn second"  placeholder={'Optimal sun exposure: '+plant.optimalSunExposure}  /><br></br><br></br>
              <input style= {{fontSize: '12px'}} type="number"  id="optimalSoilMoisture" className="fadeIn second"  placeholder={'Optimal Soil Moisture '+plant.optimalSoilMoisture}  /><br></br> <br></br>
              <button style={{width:'120px',background: '#84996f'}}className="button" type="submit"><span>Save</span></button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
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