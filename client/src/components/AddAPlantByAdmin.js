import '../css/AddForms.css'
import '../css/AddAPlant.css';
import axios from 'axios'
import React from 'react';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


export default function AddAPlantByAdmin() {

  return (
    <div style={{ fontFamily: "Open Sans" }}>
      <section id="hero" className="d-flex align-items-center">
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first">
                <br></br>
                <h1 style={{ fontSize: '35px', color: '#51361A' }} >Add A Plant To Database</h1>
              </div>
              <form style={{ fontSize: '10px' }} onSubmit={(e) => {
                addAPlantByAdmin(e)
              }}>
                <input style={{ fontSize: '12px' }} type="text" id="species" className="fadeIn second" placeholder="Species" />
                <input style={{ fontSize: '12px' }} type="text" id="irrigationInstructors" className="fadeIn second" placeholder="Irrigation Instructors" />
                <input style={{ fontSize: '12px' }} type="text" id="description" className="fadeIn second" placeholder="Description" />
                <input style={{ fontSize: '12px' }} type="number" id="optimalTemp" className="fadeIn second" placeholder="Optimal Temperature (-12 to 50)" />
                <input style={{ fontSize: '12px' }} type="number" id="optimalSunExposure" className="fadeIn second" placeholder="Optimal Sun Exposure (0 to 100)" />
                <input style={{ fontSize: '12px' }} type="number" id="optimalSoilMoisture" className="fadeIn second" placeholder="Optimal Soil Moisture (0 to 100)" />
                <br></br>
                <br></br>
                <button style={{ width: '120px', background: '#84996f' }} className="button" type="submit"><span>Add</span></button>&nbsp;
              <button style={{ width: '120px', background: '#84996f' }} className="button" onClick={() => window.location='/mygardens'}><span>Cancel</span></button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function addAPlantByAdmin(e) {

  e.preventDefault();
  if (checkRequired('species') && checkRequired('irrigationInstructors') && checkRequired('optimalTemp') &&
    checkRequired('optimalSunExposure') && checkRequired('optimalSoilMoisture') && checkRequired('description')) {
    const newPlant = {
      species: document.getElementById('species').value,
      irrigationInstructors: document.getElementById('irrigationInstructors').value,
      optimalTemp: document.getElementById('optimalTemp').value,
      optimalSunExposure: document.getElementById('optimalSunExposure').value,
      optimalSoilMoisture: document.getElementById('optimalSoilMoisture').value,
      description: document.getElementById('description').value
    }
    axios.post(process.env.REACT_APP_SERVER_URL+'/plant/', newPlant).then((Response) => {
      if (Response.data.message) {
        toast(Response.data.message)
      }
      window.location='/plantsbible/';
    });
  }
}
function checkRequired(field) {
  if (document.getElementById(field).value.length == 0) {
    toast(camelize(field) + " is required");
    return false;
  }
  if (field==='optimalTemp'){
    if (document.getElementById(field).value>50 || document.getElementById(field).value<(-12)){
    toast(camelize(field) + " is not in the range of -12 to 50");
    return false;
    }
  }
  if (field==='optimalSunExposure'|| field==='optimalSoilMoisture'){
    if (document.getElementById(field).value>100 || document.getElementById(field).value<0){
    toast(camelize(field) + " is not in the range of 0 to 100");
    return false;
    }
  }
  return true;
}

function camelize(str) {
  const field = str.replaceAll('_', ' ');
  return field.charAt(0).toUpperCase() + field.slice(1);
}