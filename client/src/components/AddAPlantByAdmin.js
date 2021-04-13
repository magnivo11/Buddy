import '../css/AddForms.css'
import '../css/AddAPlant.css';

import axios from 'axios'
 import{Link, Redirect,useHistory } from 'react-router-dom';
import logo from '../Images/LB.png'; 
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


export default function AddAPlantByAdmin(){

  const[plantAdded,setPlantAdded]=React.useState(false)
  const history = useHistory();


 
  return (
    <div>
    <section id="hero" className="d-flex align-items-center" style={{overflow:'scroll'}}>
      <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>

        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first">
            
              <h4 style= {{fontSize: '20px', color:'#51361A'}}>Add A Palnt- Admin </h4> 
        
            </div>
            <form name='gardenForm' style= {{fontSize: '10px'}}  onSubmit={(e)=>{
            addAPlantByAdmin(e)
             history.push('myGardens')
          }}>
              <input style= {{fontSize: '12px'}} type="text"  id="species" className="fadeIn second"  placeholder="Species"  />
              <input style= {{fontSize: '12px'}} type="text"  id="irrigationInstructors" className="fadeIn second"  placeholder="Irrigation Instructors"  />
              <input style= {{fontSize: '12px'}} type="number"  id="optimalTemp" className="fadeIn second"  placeholder="Optimal Temperature"  />
              <br></br>               <br></br>
              <input style= {{fontSize: '12px', hight:'50px'}} type="number"  id="optimalSunExposure" className="fadeIn second"  placeholder="Optimal Sun Exposure"  />
              <br></br>               <br></br>

              <input style= {{fontSize: '12px'}} type="number"  id="optimalSoilMoisture" className="fadeIn second"  placeholder="Optimal Soil Moisture"  />
              <input style= {{fontSize: '12px'}} type="text"  id="description" className="fadeIn second"  placeholder="Description"  />
               <input type="submit" className="fadeIn fourth"  value="Add Plant To DB"/><br/>
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