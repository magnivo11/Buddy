import '../css/AddForms.css'
import '../css/AddAPlant.css';
import axios from 'axios'
 import{useHistory } from 'react-router-dom';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


export default function AddAPlantByAdmin(){

  const history = useHistory();
 
  return (
    <div style={{fontFamily: "Open Sans"}}>
    <section id="hero" className="d-flex align-items-center">
      <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first">
            <br></br>
              <h1 style={{fontSize: '35px', color:'#51361A'}} >Add A Plant To Database</h1> 
            </div>
            <form style= {{fontSize: '10px'}}  onSubmit={(e)=>{
            addAPlantByAdmin(e)
            history.push('mygardens')
          }}>
              <input style= {{fontSize: '12px'}} type="text"  id="species" className="fadeIn second"  placeholder="Species"  />
              <input style= {{fontSize: '12px'}} type="text"  id="irrigationInstructors" className="fadeIn second"  placeholder="Irrigation Instructors"  />
              <input style= {{fontSize: '12px'}} type="text"  id="description" className="fadeIn second"  placeholder="Description"  />
              <input style= {{fontSize: '12px'}} type="number"  id="optimalTemp" className="fadeIn second"  placeholder="Optimal Temperature (-12 to 50)"  />
              <input style= {{fontSize: '12px'}} type="number"  id="optimalSunExposure" className="fadeIn second"  placeholder="Optimal Sun Exposure (0 to 100)"  />
              <input style= {{fontSize: '12px'}} type="number"  id="optimalSoilMoisture" className="fadeIn second"  placeholder="Optimal Soil Moisture (0 to 100)"  />
              <br></br>
              <br></br>
              <button style={{width:'120px',background: '#84996f'}}className="button" type="submit"><span>Add</span></button>
            </form>
           
          </div>
        </div>
      </div>
    </section>
  </div>
  );
}

function addAPlantByAdmin(e){

  e.preventDefault();

  const newPlant= { 
  species:document.getElementById('species').value,
  irrigationInstructors:document.getElementById('irrigationInstructors').value,
  optimalTemp:document.getElementById('optimalTemp').value,
  optimalSunExposure:document.getElementById('optimalSunExposure').value,
  optimalSoilMoisture:document.getElementById('optimalSoilMoisture').value,
  description: document.getElementById('description').value
  }
    axios.post('http://localhost:8080/plant/',newPlant).then((Response)=>{
      if(Response.data.message){
      toast(Response.data.message)
      }
    });
}