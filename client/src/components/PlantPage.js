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
      axios.get('http://localhost:8080/sensor/soilMoisture/' + plant.sensorID).then((Response) => {
        var soilMoisture = []
        Response.data.map((data, key) => {
          soilMoisture.push({ name: data.date, score: data.curMoist })
        })
      
        //clear old charts
        d3.selectAll('svg').remove()
  

        DrawGraph(soilMoisture, 'd3-container', '#140c04')
 


      })
    }

  })

  if (!redirectToGarden) {
    return (
      <div>

      <section id="hero" className="d-flex align-items-center" style={{overflow:'scroll'}}>
          <section id="specials" className="specials" style={{backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}>
           
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

                    <Link style={{display:'inline-block',color:"black",background:"white",borderWidth:"thin",fontWeight:"normal",border:"black",fontSize:"14px" ,height:"45px" ,width:"110px"}}
                       className="nav-link"  tto={`/editPlant/${plantID}`}> &nbsp;&nbsp;Edit plant </Link>
                              &nbsp;&nbsp;&nbsp;

              <button style={{display:'inline-block',color:"black",background:"white",borderWidth:"thin",fontWeight:"normal",border:"black",fontSize:"14px" , height:"45px",width:"110px"}} onClick={()=>{
                      axios.delete('http://localhost:8080/plant/', { data: { plantID: plantID, gardenID: plant.gardenID } })
                      setRedirectToGarden(true)
                }}> Delete plant </button>


                    <div class="inner" >
                      {(!plant.sensorID) ? <form onSubmit={(e) => {
                        addSensor(e, plantID)
                        setRedirectToGarden(true)
                      }}>
                        <input type="submit" style={{textAlign:'left' ,display:'inline-block',boxShadow:'none', marginLeft:'10px', color:"black",background:"white",borderWidth:"thin",fontWeight:"normal",border:"black",fontSize:"12px" ,borderRadius:'0px' , height:"45px" ,width:"60px"}} value="Add sensor" /><br />
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



