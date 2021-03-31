import '../css/Timeline.scss';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'
import axios from 'axios'
import React from 'react';
import DrawGraph from './Graph'
import ButtonsList from './ButtonsList';
import * as d3 from "d3"
import '../css/plantPage.css';

const data = require('../files/data.json');

export default function Plant() {

  //const [soilMoisture, setSoilmoisture] = React.useState([])
  const [sensorAdded, setSensorAdded] = React.useState(false)
  const ownerID = window.sessionStorage.getItem('userID');
  var index = window.location.toString().lastIndexOf('/') + 1
  const [redirectToGarden, setRedirectToGarden] = React.useState(false);
  const [plant, setPlant] = React.useState('');
  var plantResponse;
  const plantID = window.location.toString().substring(index)
  axios.get('http://localhost:8080/plant/' + plantID).then((Response) => {
    if (plant.length != Response.data.length) {
      plantResponse = {
        species: Response.data.species,
        status: Response.data.healtStatus,
        gardenID: Response.data.GardenID,
        sensorID: Response.data.sensorID
      };
      setPlant(plantResponse);
    }
  })

  //maybe to show all the graphs make every data set a state
  React.useEffect(() => {
    // pick the data you want to show,the ID of the container in the html,the color of each bar
    if (plant.sensorID != null) {
      console.log('sensor: ' + plant.sensorID)
      axios.get('http://localhost:8080/sensor/soilMoisture/' + plant.sensorID).then((Response) => {


        var soilMoisture = []
        Response.data.map((data, key) => {
          soilMoisture.push({ name: data.date, score: data.curMoist })
        })
        
        //clear old charts

        d3.selectAll('svg').remove()

        DrawGraph(soilMoisture, 'd3-container', '#78281F')


      })
    }

  })

  if (!redirectToGarden) {
    return (
      <div>

        <section id="hero" className="d-flex align-items-center">
          <section id="specials" className="specials" style={{ backgroundColor: 'rgba(245, 245, 220,0.85)', marginTop: '0%', marginLeft: '9%', marginRight: '9%' }}>
            <div className="container" data-aos="fade-up"  >

              <div className="row" data-aos="fade-up" data-aos-delay={100}>
                {/*Left buttons*/}
                <ButtonsList ownerID={ownerID} />


                <div className="col-lg-8 details order-2 order-lg-1">{/*main content*/}
                  <h2 style={{ fontSize: '30px' }}>{plant.species}</h2>



                  <nav className="nav-menu d-none d-lg-block" > {/*display*/}
                    <ul>
                      {(plant.sensorID) ? <li><a style={{ fontSize: '20px' }}>Soil moistrue of the last 3 days:</a></li>
                        : null}
                    </ul>
                  </nav>
                  <br></br>

                  <div id='d3-container'></div>
                  <br></br>
                  <div id='temperature'></div>


                  <div id="outer">

                    <div class="inner">  <button className="button" style={{ backgroundColor: '#C0C0C0', color: 'white', borderColor: 'black', padding: '15px 46px', display: 'inline-block', fontSize: '16px', margin: '2px 2px', borderRadius: '2px', transitionDuration: '0.4s' }} onClick={() => {
                      axios.delete('http://localhost:8080/plant/', { data: { plantID: plantID, gardenID: plant.gardenID } })
                      setRedirectToGarden(true)
                    }}>DELETE</button></div>
                    <div class="inner" > <li className="button" style={{ color: 'white', backgroundColor: '#C0C0C0', border: '3px', padding: '15px 36px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '4px 2px', cursor: 'pointer', boxShadow: 'none', borderRadius: '2px' }}>
                      <Link style={{ color: 'white', textDecoration: 'none' }} className="nav-link2" to={`/editPlant/${plantID}`}>EDIT</Link>
                    </li></div>
                    <div class="inner" >
                      {(!plant.sensorID) ? <form onSubmit={(e) => {
                        addSensor(e, plantID)
                        setRedirectToGarden(true)
                      }}>
                        <input type="submit" style={{ backgroundColor: '#C0C0C0', color: 'white', border: 'none', padding: '15px 36px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '4px 2px', cursor: 'pointer', boxShadow: 'none', borderRadius: '2px', transitionDuration: '0.4s' }} value="Add sensor" /><br />
                      </form> : null}
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

  else {
    return (<Redirect to="/mygardens" />)
  }
}


function addSensor(e, plantID) {

  e.preventDefault();

  const newSensor = {
    plantID: plantID
  }
  console.log(newSensor);
  axios.post('http://localhost:8080/sensor/', newSensor);

}

function addPhoto(e, plantID) {
  e.preventDefault();
  document.getElementById('photoLink').value = 'Uploaded';
  const newPhoto = {
    link: document.getElementById('photoLink').value,
    plantID: plantID
  }

  axios.post('http://localhost:8080/photo/', newPhoto);

}



