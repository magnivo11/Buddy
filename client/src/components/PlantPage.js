import '../css/Timeline.scss';
import { Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import axios from 'axios'
import React from 'react';
import DrawGraph from './Graph'
import ButtonsGardensList from './ButtonsGardensList';
import * as d3 from "d3"
import '../css/plantPage.css';
import Chart from './Chart';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadImage from './UploadImage';

const data = require('../files/data.json');

export default function Plant() {

  const history = useHistory();
  var index = window.location.toString().lastIndexOf('/') + 1
  const [plantID, setPlantID] = React.useState(window.location.toString().substring(index));
  const [plant, setPlant] = React.useState('');
  const [garden, setGarden] = React.useState('');
  const [gardenID, setGardenID] = React.useState('');
  const [sensor, setSensor] = React.useState('');
  const [chartData, setChartData] = React.useState({ data: [], title: '', optimal: '' ,showHistory:false});
 

  //set plant from server
  React.useEffect(() => {

    fetch('http://localhost:8080/plant/' + plantID)
      .then(response => response.json()).then(
        data => {
          setPlant(data);
          //set sesnor data and chart data
          if (data.sensorID)
            axios.get('http://localhost:8080/sensor/' + data.sensorID).then((Response) => {
              setSensor(Response.data)
              setChartData({ data: Response.data.soilMoisture, title: 'Soil Moisture', optimal: data.optimalSoilMoisture,showHistory:false })
            })
          //set plant's garden from server
          fetch('http://localhost:8080/garden/find/' + data.GardenID)
            .then(response => response.json()).then(
              data => {
                setGarden(data);
              })
        }
      )
  }, [plantID]);




  //change the chart data (soil/temp/light)
  const changeChartData = (e) => {
    var data;
    var optimalValue;
    if (e.target.value == 'Soil Moisture') {
      data = sensor.soilMoisture
      optimalValue = plant.optimalSoilMoisture
    }


    if (e.target.value == 'Temperature') {
      data = sensor.temperature
      optimalValue = plant.optimalTemp

    }

    if (e.target.value == 'Sun Exposure') {
      data = sensor.light
      optimalValue = plant.optimalSunExposure
    }


    setChartData({ title: e.target.value, data: data, optimal: optimalValue,showHistory:chartData.showHistory })
  }

  //changes the chart period of display (last 10/plant history)
  const showHistory=(e)=>{

if(e.target.value=='last 10')
  setChartData({ title: chartData.title, data: chartData.data, optimal: chartData.optimal,showHistory:false })
if(e.target.value=='plant history')
  setChartData({ title: chartData.title, data: chartData.data, optimal: chartData.optimal,showHistory:true })

  }




  return (
    <div style={{ fontFamily: "Open Sans" }}>
      <section id="hero" className="d-flex align-items-center " style={{ overflow: 'scroll' }}>
        <section id="specials" className="specials" style={{ backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop: '0%', marginLeft: '9%', marginRight: '9%' }}>
          <div className="container " data-aos="fade-up"  >
            <div className="row" data-aos="fade-up" data-aos-delay={100}>
              <div className="col-lg-3">
                <ul className="nav nav-tabs flex-column d-none d-lg-block">
                  {/*Title*/}
                  <div className="section-title fixedContainer" >
                    <br></br><br /><br /><br /><br/>{plant.sensorID && <div><br/><br/></div>}
                    <p >{garden.name} Garden </p>
                  </div>
                  {/*Left buttons*/}
                  {garden && <ButtonsGardensList setPlantID={setPlantID} gardenID={garden._id} />}
                </ul>
              </div>
              <div className="col-lg-8 details order-2 order-lg-1">{/*main content*/}
                <div className="section-title" > <br></br><br /><br /><br /><br/><br/>{plant.sensorID && <div><br/><br/></div>}
                  <h2 style={{ fontSize: '45px' }}>
                    {plant.species} </h2>
                </div>

                <div class="inner" >
                  {(!plant.sensorID) ? <div>

                    <form onSubmit={(e) => {
                      addSensor(e, plantID)
                      history.push('/mygardens')

                    }}>
                      <div style={{ fontFamily: "Open Sans" }}>
                        <p className="noSensor section-title " style={{ color: 'white' }}>Looks like you haven't added a sensor to your plant</p>
                        <p className="noSensor section-title" style={{ color: 'white' }}><small>Add one now!</small></p>
                      </div>
                      <input type="text" id="sensorId" name="sensorId" style={{ width: '290px' }} placeholder="Enter Serial Number (on device)" />
                      <button style={{ width: '120px', background: '#84996f' }} className="button" type="submit"><span>Add Sensor</span></button>
                     </form> </div> :
                    <div>
                       <button type="button" value='last 10' onClick={showHistory} class="btn btn-default"> last 10</button>
                       <button type="button" value='plant history' onClick={showHistory} class="btn btn-default"> plant history</button>
                      <div style={{ display: 'flex', flexDirection: 'raw' }} class='header'>

                        <button type="button" value='Soil Moisture' onClick={changeChartData} class="btn btn-default"> Soil Moisture</button>
                        <button type="button" value='Temperature' onClick={changeChartData} class="btn btn-default"> Temperature</button>
                        <button type="button" value='Sun Exposure' onClick={changeChartData} class="btn btn-default"> Sun Exposure</button>
                      </div>
                      <Chart title={chartData.title} sensorData={chartData.data} optimalValue={chartData.optimal} showHistory={chartData.showHistory}></Chart>
                    </div>

                  }
                </div>
                <br></br>
                <Link to={`/editPlant/${plantID}`} style={{ width: '120px', background: 'white' }} className="button" >
                  <span style={{ color: 'black' }}>Edit Plant</span></Link> &nbsp;
                  <button style={{ width: '120px', background: 'white' }} className="button" type="submit"
                  onClick={() => {
                    axios.delete('http://localhost:8080/plant/', { data: { plantID: plantID, gardenID: plant.GardenID } })
                    history.push('/mygardens')
                  }}>
                  <span style={{ color: 'black' }} >Delete Plant</span></button><br></br>
                  <h2 style={{ fontSize: '30px' }}>
                    {plant.species} photos</h2>
                    <UploadImage plantID={plantID} type="plant" ></UploadImage>
              <div>
              </div>
              
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
  var sensorId = document.getElementById('sensorId').value;
  if (sensorId != '') {
    const newSensor = {
      plantID: plantID, 
      sensorId: sensorId
    }
    axios.post('http://localhost:8080/sensor/', newSensor).then((res) => {
      if (res.status == 200) {
        toast("The sensor added successfully"); 
      }
    });
  }
  else {
    toast("Sensor Serial Number is required")
  }
}

