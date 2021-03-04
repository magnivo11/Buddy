import axios from 'axios'
  import React from 'react';

export default function PlantsBibleSinglePlant() {

  var index = window.location.toString().lastIndexOf('/') + 1;
  const plantID = window.location.toString().substring(index);
  const [plant, setPlant] = React.useState(false);

  React.useEffect(()=>{ 
  axios.get('http://localhost:8080/plant/' + plantID).then((Response) => {
    if (plant != Response.data) {
      setPlant(Response.data);
    }
  });
},[]);
  return (
    <div>
      <section id="hero" className="d-flex align-items-center">
        <section id="specials" className="specials" style={{ backgroundColor: 'rgba(245, 245, 220,0.85)', marginTop: '19%', marginLeft: '9%', marginRight: '9%', marginBottom: '15%' }}>
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2 style={{ fontSize: '35px' }}>Plants Information</h2>
              <p style={{ fontSize: '30px' }}>{plant.species}</p>
              <br></br>
              <dl>
                 <dt style={{ fontSize: '18px' }}>Irrigation Instructors:</dt><dd style={{ fontSize: '16px' }}>{plant.irrigationInstructors}</dd>
                <dt style={{ fontSize: '18px' }}>Ideal temprture:</dt><dd style={{ fontSize: '16px' }}> {plant.optimalTemp} </dd>
                <dt style={{ fontSize: '18px' }}>Optimal soil moisture:</dt><dd style={{ fontSize: '16px' }}>{plant.optimalSoilMoisture}</dd>
                <dt style={{ fontSize: '18px' }}>Optimal sun condition:</dt><dd style={{ fontSize: '16px' }}> {plant.optimalSunExposure}</dd>
                <dt style={{ fontSize: '18px' }}>Description:</dt><dd style={{ fontSize: '16px' }}>{plant.description}</dd>
                <dt style={{ fontSize: '18px' }}>Photo:</dt><dd style={{ fontSize: '16px' }}>{plant.defaultPhotoID} </dd>

              </dl>

            </div>
          </div>
        </section>
      </section>
    </div>

  );
}