import axios from 'axios'
import React from 'react';
import '../css/PlantsBibleSinglePlant.css';

export default function PlantsBibleSinglePlant() {

  var index = window.location.toString().lastIndexOf('/') + 1;
  const plantID = window.location.toString().substring(index);
  const [plant, setPlant] = React.useState(false);

  React.useEffect(() => {
    axios.get('http://localhost:8080/plant/' + plantID).then((Response) => {
      if (plant != Response.data) {
        setPlant(Response.data);

      }
    });
  }, []);

  return (
    <div>
      <section id="hero" className="d-flex align-items-center">
        <section id="specials" className="specials" style={{ backgroundColor: 'rgba(245, 245, 220,0.85)', marginTop: '0%', marginLeft: '9%', marginRight: '9%', marginBottom: '0%' }}>
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2 style={{ fontSize: '35px' }}>Plants Information</h2>
              <p style={{ fontSize: '30px' }}>{plant.species}</p>
              <br></br>

              <div class="row">
                <div class="column">
                  <div class="card">
                    <dt style={{ fontSize: '18px', fontWeight: 'normal' }}>Irrigation Instructors</dt>
                    <i class="fa fa-shower fa-lg" aria-hidden="true"></i>
                    <dd style={{ fontSize: '30px', fontWeight: 'bold' }}>{plant.irrigationInstructors}</dd></div>
                </div>
                <div class="column">
                  <div class="card">
                    <dt style={{ fontSize: '18px', fontWeight: 'normal' }}>Ideal temprture </dt>
                    <i class="fa fa-thermometer-three-quarters fa-lg" aria-hidden="true"></i>
                    <dd style={{ fontSize: '30px', fontWeight: 'bold' }}>{plant.optimalTemp}</dd></div>
                </div>
                <div class="column">
                  <div class="card">
                    <dt style={{ fontSize: '18px', fontWeight: 'normal' }}>Optimal soil moisture</dt>
                    <i class="fa fa-tint fa-lg" aria-hidden="true"></i>
                    <dd style={{ fontSize: '30px', fontWeight: 'bold' }}>{plant.optimalSoilMoisture}</dd></div>
                </div>
                <div class="column">
                  <div class="card">
                    <dt style={{ fontSize: '18px', fontWeight: 'normal' }}>Optimal sun condition</dt>
                    <i class="fa fa-sun-o fa-lg" aria-hidden="true"></i>
                    <dd style={{ fontSize: '30px', fontWeight: 'bold' }}>{plant.optimalSunExposure}</dd></div>
                </div>
                <div class="column">
                  <div class="card">  <dt style={{ fontSize: '18px', fontWeight: 'normal' }}>Description <i class="fa fa-book"></i>   {plant.description}</dt>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>

  );
}