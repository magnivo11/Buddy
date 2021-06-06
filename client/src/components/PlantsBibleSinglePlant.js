import axios from 'axios'
import React from 'react';

import { Link } from 'react-router-dom';

import '../css/PlantsBibleSinglePlant.css';

export default function PlantsBibleSinglePlant() {

  var index = window.location.toString().lastIndexOf('/') + 1;
  const plantID = window.location.toString().substring(index);
  const [plant, setPlant] = React.useState(false);
  const ownerID = window.sessionStorage.getItem('userID');
  const [editPermission, setEditPermission] = React.useState(false);



  React.useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL+'/plant/' + plantID).then((Response) => {
      if (plant !== Response.data) {
        setPlant(Response.data);

      }
    });
  }, []);

  React.useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL+'/user/' + ownerID)
      .then(response => response.json()).then(
        data => {
          if (data.isAdmin)
            setEditPermission(true);
        }
      )
  }, []);

  return (
    <div style={{ fontFamily: "Open Sans" }}>
      <section id="hero" className="d-flex align-items-center" style={{ overflow: 'scroll' }}>
        <section id="specials" className="specials" style={{ backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop: '0%', marginLeft: '9%', marginRight: '9%' }}>
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <br /><br />    <br /><br />
              <h2 style={{ fontSize: '30px' }}>Plant Information</h2>
              <p style={{ fontSize: '30px' }}>{plant.species}</p>
              <div className="row">
                <div className="column">
                  <div className="card">
                    <dt style={{ fontSize: '18px', fontWeight: 'normal' }}>Irrigation Instructors</dt>
                    <i className="fa fa-shower fa-lg" aria-hidden="true"></i>
                    <dd style={{ fontSize: '20px', fontWeight: 'bold' }}>{plant.irrigationInstructors}</dd></div>
                </div>
                <div className="column">
                  <div className="card">
                    <dt style={{ fontSize: '18px', fontWeight: 'normal' }}>Description </dt>
                    <i className="fa fa-book" aria-hidden="true"></i>
                    <dd style={{ fontSize: '20px', fontWeight: 'bold' }}>{plant.description}</dd>
                  </div>
                </div>
              </div>
              <div className="row">

                <div className="column">
                  <div className="card">
                    <dt style={{ fontSize: '18px', fontWeight: 'normal' }}>Optimal temprture </dt>
                    <i className="fa fa-thermometer-three-quarters fa-lg" aria-hidden="true"></i>
                    <dd style={{ fontSize: '22px', fontWeight: 'bold' }}>{plant.optimalTemp}</dd></div>
                </div>
                <div className="column">
                  <div className="card">
                    <dt style={{ fontSize: '18px', fontWeight: 'normal' }}>Optimal soil moisture</dt>
                    <i className="fa fa-tint fa-lg" aria-hidden="true"></i>
                    <dd style={{ fontSize: '22px', fontWeight: 'bold' }}>{plant.optimalSoilMoisture}</dd></div>
                </div>
                <div className="column">
                  <div className="card">
                    <dt style={{ fontSize: '18px', fontWeight: 'normal' }}>Optimal sun exposure</dt>
                    <i className="fa fa-sun-o fa-lg" aria-hidden="true"></i>
                    <dd style={{ fontSize: '22px', fontWeight: 'bold' }}>{plant.optimalSunExposure}</dd></div>
                </div>

              </div>
              {editPermission ?
                <Link to={`/editPlantByAdmin/${plantID}`} style={{ width: '120px', background: 'white' }} className="button" >
                  <span style={{ color: 'black' }}>Edit Plant</span>
                </Link> : null} &nbsp;
              {editPermission ? <button style={{ width: '120px', background: 'white' }} className="button" type="submit"
                onClick={() => {

                  axios.delete(process.env.REACT_APP_SERVER_URL+'/plant/byAdmin', { data: { plantID: plantID } })
                  window.location='/plantsBible'

                }}><span style={{ color: 'black' }} >Delete Plant</span>
              </button> : null}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}