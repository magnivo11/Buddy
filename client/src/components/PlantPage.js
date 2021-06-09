import '../css/Timeline.scss';
import { Link } from 'react-router-dom';
import axios from 'axios'
import React from 'react';
import ButtonsGardensList from './ButtonsGardensList';
import '../css/plantPage.css';
import Chart from './Chart';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadImage from './UploadImage';
import PhotoSlide from './PhotoSlide';
import socket from '../common/ReactSocket'


const data = require('../files/data.json');

export default function Plant() {
  var index = window.location.toString().lastIndexOf('/') + 1
  const [plantID, setPlantID] = React.useState(window.location.toString().substring(index));
  const [plant, setPlant] = React.useState('');
  const [garden, setGarden] = React.useState('');
  const [sensor, setSensor] = React.useState('');
  const [mobileMode, setMobileMode] = React.useState(false);
  const [lastUpdated, setLastUpdated] = React.useState(Date.now());
  const [chartData, setChartData] = React.useState({ data: [], title: '', optimal: '', showHistory: false });
  React.useEffect(() => {
    if (window.innerWidth > 700){
      setMobileMode(true)
    }
    //set plant from server
    fetch(process.env.REACT_APP_SERVER_URL + '/plant/' + plantID)
      .then(response => response.json()).then(
        data => {
          setPlant(data);
          //set sesnor data and chart data
          if (data.sensorID)
            axios.get(process.env.REACT_APP_SERVER_URL + '/sensor/' + data.sensorID).then((Response) => {
              setSensor(Response.data)
              setChartData({ data: Response.data.soilMoisture, title: 'Soil Moisture', optimal: data.optimalSoilMoisture, showHistory: false })
            })
          //set plant's garden from server
          fetch(process.env.REACT_APP_SERVER_URL + '/garden/find/' + data.GardenID)
            .then(response => response.json()).then(
              data => {
                setGarden(data);
              })
        }
      )
  }, [plantID, lastUpdated]);

  //changes last time the data from sensor was updated
  React.useEffect(() => {
    socket.on('sensor update', () => {
      setLastUpdated(Date.now())
    })
  }, [])



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


    setChartData({ title: e.target.value, data: data, optimal: optimalValue, showHistory: chartData.showHistory })
  }

  //changes the chart period of display (last 10/plant history)
  const showHistory = (e) => {

    if (e.target.value == 'last 10')
      setChartData({ title: chartData.title, data: chartData.data, optimal: chartData.optimal, showHistory: false })
    if (e.target.value == 'plant history')
      setChartData({ title: chartData.title, data: chartData.data, optimal: chartData.optimal, showHistory: true })

  }
  



  return (
    <div style={{ fontFamily: "Open Sans" }}>
      <section id="hero" style={{ overflow: 'scroll' }}>
        <section id="specials" className="specials" style={{ backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop: '0%', marginLeft: '9%', marginRight: '9%' }}>
          <div className="container plantContainer" data-aos="fade-up"  >
            <div className="row" data-aos="fade-up" data-aos-delay={100}>
              <div className="col-lg-3">
                <ul className="nav nav-tabs flex-column d-none d-lg-block">
                  {/*Title*/}
                  <div className="section-title fixedContainer" >

                    <p >{garden.name}</p>
                  </div>
                  {/*Left buttons*/}
                  {garden && <ButtonsGardensList setPlantID={setPlantID} gardenID={garden._id} />}
                </ul>
              </div>
              <div className="col-lg-8 details order-2 order-lg-1">{/*main content*/}
                <div> 
                  <h2 style={{ fontSize: '45px' }}>
                    {plant.species} </h2>
                  <h2 style={{ fontSize: '20px', color: '#cda45e'  }}>
                    status:</h2><h2 style={{ fontSize: '20px' }}>
                    {plant.growthStatus} </h2>
                    {plant.sensorID &&<div>
                    <h2 style={{ fontSize: '20px', color: '#cda45e'}}>
                    sensor num:</h2><h2 style={{ fontSize: '20px' }}>
                    {sensor.serialNumber} </h2></div>}
                </div>

                <div className="inner" >
                  {(!plant.sensorID) ? <div>

                    <form onSubmit={(e) => {
                      addSensor(e, plantID)
                      window.location = '/plant/'+plantID

                    }}>
                      <div style={{ fontFamily: "Open Sans" }}>
                        <p className="noSensor section-title " style={{ color: 'white' }}>Looks like you haven't added a sensor</p>
                        <p className="noSensor section-title" style={{ color: 'white' }}><small>Add one now!</small></p>
                      </div>
                      <input type="text" id="sensorId" name="sensorId" style={{ width: '290px' }} placeholder="Enter Serial Number (on device)" />
                      <button style={{ width: '120px', background: '#84996f' }} className="button" type="submit"><span>Add Sensor</span></button>
                    </form> </div> :
                    <div>
                      <div style={{ display: 'flex', flexDirection: 'raw' }} class='header'>
                        <button type="button"  style= {!mobileMode?{ width: '66px', color: "grey", backgroundColor: 'rgba(52, 52, 52, 0.8)',fontSize:"8px" }:{ width: '167px', color: "grey", backgroundColor: 'rgb(240, 232, 211)' }} value='Soil Moisture' onClick={changeChartData} class="btn btn-default"> Soil Moisture</button>
                        <button type="button" style={!mobileMode?{ width: '66px', color: "grey", backgroundColor: 'rgba(52, 52, 52, 0.8)',fontSize:"8px" }:{ width: '167px', color: "grey", backgroundColor: 'rgb(240, 232, 211)' }} value='Temperature' onClick={changeChartData} class="btn btn-default"> Temperature</button>
                        <button type="button" style={!mobileMode?{ width: '66px', color: "grey", backgroundColor: 'rgba(52, 52, 52, 0.8)',fontSize:"8px" }:{ width: '167px', color: "grey", backgroundColor: 'rgb(240, 232, 211)' }} value='Sun Exposure' onClick={changeChartData} class="btn btn-default"> Sun Exposure</button>
                      </div>
                      <Chart title={chartData.title} sensorData={chartData.data} optimalValue={chartData.optimal} showHistory={chartData.showHistory}></Chart>
                      <button type="button" style={!mobileMode?{ width: '200px', color: "white", backgroundColor: 'rgba(52, 100, 52, 0.8)' }:{ width: '250px', color: "white", backgroundColor: 'rgba(52, 100, 52, 0.8)' }} value='last 10' onClick={showHistory} class="btn btn-default"> Last 10 Measurements</button>
                      <button type="button" style={!mobileMode?{ width: '200px', color: "white", backgroundColor: 'rgba(52, 100, 52, 0.8)' }:{ width: '251px', color: "white", backgroundColor: 'rgba(52, 100, 52, 0.8)' }} value='plant history' onClick={showHistory} class="btn btn-default"> Plant History</button>

                      <br />                    <br />

                    </div>


                  }
                </div>
                <br></br>
                <Link to={`/editPlant/${plantID}`} style={{ width: '120px', background: 'white' }} className="button" >
                  <span style={{ color: 'black' }}>Edit Plant</span></Link> &nbsp;
                  <button style={{ width: '120px', background: 'white' }} className="button" type="submit"
                  onClick={() => {
                    axios.delete(process.env.REACT_APP_SERVER_URL + '/plant/', { data: { plantID: plantID, gardenID: plant.GardenID } })
                    window.location = "/singlegarden/" + plant.GardenID
                  }}>
                  <span style={{ color: 'black' }} >Delete Plant</span></button><br></br>
                  {!mobileMode &&<button style={{ width: '120px', background: 'white' }} className="button"  onClick={()=>window.location=`/singlegarden/${garden._id}`} >                  
                  <span style={{ color: 'black' }}>Back to garden</span></button>}
                <h2 style={{ fontSize: '30px' }}>
                  {plant.species} photos</h2>
                <UploadImage ownerID={plantID} type="plant" ></UploadImage>
                <PhotoSlide plantID={plantID}></PhotoSlide>
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
    axios.post(process.env.REACT_APP_SERVER_URL + '/sensor/', newSensor).then((res) => {
      if (res.status == 200) {

        toast("The sensor was added successfully");
      }
    });
  }
  else {
    toast("Sensor Serial Number is required")
  }
}

