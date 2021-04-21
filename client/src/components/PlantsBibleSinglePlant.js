import axios from 'axios'
import React from 'react';

import {Redirect,Link,useHistory} from 'react-router-dom';

import '../css/PlantsBibleSinglePlant.css';

export default function PlantsBibleSinglePlant() {
  
  const history = useHistory();
  var index = window.location.toString().lastIndexOf('/') + 1;
  const plantID = window.location.toString().substring(index);
  const [plant, setPlant] = React.useState(false);
  const ownerID = window.sessionStorage.getItem('userID');


  React.useEffect(() => {
    axios.get('http://localhost:8080/plant/' + plantID).then((Response) => {
      if (plant !== Response.data) {
        setPlant(Response.data);

      }
    });
  }, []);
 
  var isAdmin=false;

  React.useEffect(() => {
    fetch('http://localhost:8080/user/' + ownerID)
      .then(response => response.json()).then(
        data => {
          isAdmin=data.isAdmin;
        }
      )
  }, []);

  return (
    <div  style={{fontFamily: "Open Sans"}}>
    <section id="hero" className="d-flex align-items-center" style={{overflow:'scroll'}}>
       <section id="specials" className="specials" style={{backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}> 
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <br/><br/>    <br/><br/>
              <h2 style={{ fontSize: '30px' }}>Plant Information</h2>
              <p style={{ fontSize: '30px' }}>{plant.species}</p>
              <div class="row">
                <div class="column">
                  <div class="card">
                    <dt style={{ fontSize: '18px', fontWeight: 'normal' }}>Irrigation Instructors</dt>
                    <i class="fa fa-shower fa-lg" aria-hidden="true"></i>
                    <dd style={{ fontSize: '20px', fontWeight: 'bold' }}>{plant.irrigationInstructors}</dd></div>
                </div>
                <div class="column">
                  <div class="card">  
                  <dt style={{ fontSize: '18px', fontWeight: 'normal' }}>Description </dt>
                  <i class="fa fa-book"  aria-hidden="true"></i>
                    <dd style={{ fontSize: '20px', fontWeight: 'bold' }}>{plant.description}</dd>
                    </div>
                </div>
                </div>
                <div class="row">

                <div class="column">
                  <div class="card">
                    <dt style={{ fontSize: '18px', fontWeight: 'normal' }}>Optimal temprture </dt>
                    <i class="fa fa-thermometer-three-quarters fa-lg" aria-hidden="true"></i>
                    <dd style={{ fontSize: '22px', fontWeight: 'bold' }}>{plant.optimalTemp}</dd></div>
                </div>
                <div class="column">
                  <div class="card">
                    <dt style={{ fontSize: '18px', fontWeight: 'normal' }}>Optimal soil moisture</dt>
                    <i class="fa fa-tint fa-lg" aria-hidden="true"></i>
                    <dd style={{ fontSize: '22px', fontWeight: 'bold' }}>{plant.optimalSoilMoisture}</dd></div>
                </div>
                <div class="column">
                  <div class="card">
                    <dt style={{ fontSize: '18px', fontWeight: 'normal' }}>Optimal sun exposure</dt>
                    <i class="fa fa-sun-o fa-lg" aria-hidden="true"></i>
                    <dd style={{ fontSize: '22px', fontWeight: 'bold' }}>{plant.optimalSunExposure}</dd></div>
                </div>

              </div>
              {isAdmin?
              <Link  to={`/editPlantByAdmin/${plantID}`} style={{width:'120px',background: 'white'}}className="button" >
                <span style={{color:'black'}}>Edit Plant</span>
              </Link> :null} &nbsp;
              {isAdmin?<button style={{width:'120px',background: 'white'}}className="button" type="submit"
                onClick={()=>{
                  axios.delete('http://localhost:8080/plant/byAdmin',{data:{plantID:plantID}})
                  history.push('/plantsBible')
                }}><span style={{color:'black'}} >Delete Plant</span>
              </button>:null}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}