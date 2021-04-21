import '../css/Timeline.scss';
import { Redirect,useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import axios from 'axios'
import React from 'react';
import DrawGraph from './Graph'
import ButtonsList from './ButtonsList';
import * as d3 from "d3"
import '../css/plantPage.css';
import Chart from './Chart';

const data = require('../files/data.json');

export default function Plant() {

  //const [soilMoisture, setSoilmoisture] = React.useState([])
  const history = useHistory();
  const ownerID = window.sessionStorage.getItem('userID');
  var index = window.location.toString().lastIndexOf('/') + 1
  const [plant, setPlant] = React.useState('');
  var plantResponse;
  const plantID = window.location.toString().substring(index);
  const [garden, setGarden] = React.useState('');


  //set plant from server
  React.useEffect(() => {
    fetch('http://localhost:8080/plant/' + plantID)
      .then(response => response.json()).then(
        data => {
          setPlant(data);
            //set plant's garden name from server
          fetch('http://localhost:8080/garden/find/'+data.GardenID)
            .then(response => response.json()).then(
              data => {
                setGarden(data)
              })
        }
      )
  }, []);

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
        DrawGraph(soilMoisture, 'd3-container', 'darkgreen')
      })
    }
  })

  const [sensor,setSensor]=React.useState('');
  if(!sensor._id&&plant.sensorID)
  axios.get('http://localhost:8080/sensor/'+plant.sensorID).then((Response)=>{

  setSensor(Response.data)
  })



    return (
      <div  style={{fontFamily: "Open Sans"}}>
      <section id="hero" className="d-flex align-items-center" style={{overflow:'scroll'}}>
         <section id="specials" className="specials" style={{backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}> 
          <div className="container" data-aos="fade-up"  >
            <div className="row" data-aos="fade-up" data-aos-delay={100}>
             <div className="col-lg-3">
                <ul className="nav nav-tabs flex-column">
                    {/*Title*/}
                    <div className="section-title" >
                      <br></br>
                      <h2 style={{fontSize:'36px'}}>My Gardnes</h2>
                      <p style={{fontSize:'35px'}}>{garden.name} Garden </p>
                     </div>
                  {/*Left buttons*/}
                  <ButtonsList ownerID= {ownerID}/>
                </ul>
            </div>
            <div className="col-lg-8 details order-2 order-lg-1">{/*main content*/}
              <div className="section-title" > <br></br>
                  <h2 style={{fontSize:'45px'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {plant.species} </h2>
              </div>
            
              
              
                  <div class="inner" >
                    {(!plant.sensorID) ? <div>

                    <form onSubmit={(e) => {
                      addSensor(e, plantID)
                      history.push('/mygardens')
                    }}>
                    <div className="nav-menu d-none d-lg-block">
                    <p style={{fontSize:"25px",color:'white', textAlign:'left'}}className="nav-menu d-none d-lg-block">Looks like you haven't added a sensor</p>
                    <p style={{fontSize:"20px",color:'white', textAlign:'left'}}className="nav-menu d-none d-lg-block">Add one now!</p>
                      </div>  
                    <button style={{width:'120px',background: '#84996f'}}className="button" type="submit"><span>Add Sensor</span></button>
                    </form> </div>:
                    <Chart title='Soil Moisture' sensorData={sensor.soilMoisture} optimalValue={plant.optimalSoilMoisture}></Chart>
                    }
                  </div>
                  <br></br>
                  <Link to={`/editPlant/${plantID}`} style={{width:'120px',background: 'white'}}className="button" >
                  <span style={{color:'black'}}>Edit Plant</span></Link> &nbsp;
                  <button style={{width:'120px',background: 'white'}}className="button" type="submit"
                    onClick={()=>{
                      axios.delete('http://localhost:8080/plant/', { data: { plantID: plantID, gardenID: plant.GardenID } })
                      history.push('/mygardens')}}>
                  <span style={{color:'black'}} >Delete Plant</span></button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
    );

  }



function addSensor(e, plantID) {
  e.preventDefault();
  const newSensor = {
    plantID: plantID
  }
  axios.post('http://localhost:8080/sensor/', newSensor);
}

// function addPhoto(e, plantID) {
//   e.preventDefault();
//   document.getElementById('photoLink').value = 'Uploaded';
//   const newPhoto = {
//     link: document.getElementById('photoLink').value,
//     plantID: plantID
//   }
//   axios.post('http://localhost:8080/photo/', newPhoto);
// }



