import '../css/AddForms.css'
import '../css/AddAPlant.css';

import axios from 'axios'
import { Redirect, useHistory } from 'react-router-dom';
import React from 'react';


export default function EditPlantByAdmin() {
  var index = window.location.toString().lastIndexOf('/') + 1
  const plantID = window.location.toString().substring(index)
  const [plant, setPlant] = React.useState({ _id: '' });
  const history = useHistory();

  React.useEffect(() => {
    fetch('http://localhost:8080/plant/' + plantID)
      .then(response => response.json()).then(
        data => {
          setPlant(data);
        }
      )
  }, []);

  return (
    <div style={{ fontFamily: "Open Sans" }}>
      <section id="hero" className="d-flex align-items-center">
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first">
                <h1 style={{ fontSize: '35px', color: '#51361A' }} >Edit Plant </h1>
              </div>
              <form name='gardenForm' style={{ fontSize: '10px' }} onSubmit={(e) => {
                editPlantByAdmin(e, plant.species, plant.irrigationInstructors, plant.optimalTemp, plant.optimalSunExposure,
                  plant.optimalSoilMoisture, plant.description, plantID, history)
              }}>
                <input style={{ fontSize: '12px' }} type="text" id="species" className="fadeIn second" placeholder={'Species: ' + plant.species} />
                <input style={{ fontSize: '12px' }} type="text" id="irrigationInstructors" className="fadeIn second" placeholder={'Irrigation Instructors: ' + plant.irrigationInstructors} />
                <input style={{ fontSize: '12px' }} type="text" id="description" className="fadeIn second" placeholder={'Description: ' + plant.description} />

                <input style={{ fontSize: '12px' }} type="number" id="optimalTemp" className="fadeIn second" placeholder={'Optimal Temperature: ' + plant.optimalTemp} /><br></br><br></br>
                <input style={{ fontSize: '12px', hight: '50px' }} type="number" id="optimalSunExposure" className="fadeIn second" placeholder={'Optimal sun exposure: ' + plant.optimalSunExposure} /><br></br><br></br>
                <input style={{ fontSize: '12px' }} type="number" id="optimalSoilMoisture" className="fadeIn second" placeholder={'Optimal Soil Moisture ' + plant.optimalSoilMoisture} /><br></br> <br></br>
                <button style={{ width: '120px', background: '#84996f' }} className="button" type="submit"><span>Save</span></button>&nbsp;
                <button style={{ width: '120px', background: '#84996f' }} className="button" onClick={() => history.push('/mygardens')}><span>Cancel</span></button>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
function editPlantByAdmin(e, species, irrigationInstructors, optimalTemp, optimalSunExposure,
  optimalSoilMoisture, description, plantID,history) {
    e.preventDefault();

  const newPlant = {
    id: plantID,
    species: checkField(species,'species'),
    irrigationInstructors: checkField(irrigationInstructors,'irrigationInstructors'),
    optimalTemp: checkField(optimalTemp,'optimalTemp'),
    optimalSunExposure: checkField(optimalSunExposure,'optimalSunExposure'),
    optimalSoilMoisture: checkField(optimalSoilMoisture,'optimalSoilMoisture'),
    description: checkField(description,'description')
  }
  axios.put('http://localhost:8080/plant/byadmin', newPlant);
  history.push('/PlantsBible')

}

function checkField(beforeUpdate,field){
  let updated="";
  if (document.getElementById(field).value.length == 0) 
      updated = beforeUpdate;
  else updated = document.getElementById(field).value;
  return updated;
}