import '../css/Timeline.scss';
import Pothos from '../Images/pothos.JPG';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Ivy from '../Images/ivy.JPG';
import Ivy0 from '../Images/PhotoStages/0.jpg';
import Ivy1 from '../Images/PhotoStages/1.JPG';
import {Link} from 'react-router-dom'
import axios from 'axios'
import React from 'react';
import Cyclamen from '../Images/cyclamen.JPG';
import light24 from '../Images/Graphs/light1.JPG';
import soil24 from '../Images/Graphs/soil 1.jpg';
import temp24 from '../Images/Graphs/temp 1.jpg';
import DataContext from '../DataContext';
import DrawGraph from './Graph'
import * as d3 from "d3"


const data = require ('../files/data.json'); 

export default function Plant(){

  const[soilMoisture,setSoilmoisture]=React.useState([])
  const[sensorAdded,setSensorAdded]=React.useState(false)
  const[photoAdded,setPhotoAdded]=React.useState(false)

  var photo;

  var index=window.location.toString().lastIndexOf('/')+1


  const[redirectToGarden,setRedirectToGarden]=React.useState(false);
  const [plant,setPlant]=React.useState('');

  var plantResponse;
  const plantID=window.location.toString().substring(index)
  axios.get('http://localhost:8080/plant/'+plantID).then((Response)=> {
    if(plant.length!=Response.data.length)
    {
    plantResponse={species: Response.data.species, 
      status:Response.data.healtStatus, 
      gardenID:Response.data.GardenID,
      sensorID:Response.data.sensorID};
    setPlant(plantResponse);
    }
  })

 
//maybe to show all the graphs make every data set a state

  React.useEffect(()=>{

    

  



   
// pick the data you want to show,the ID of the container in the html,the color of each bar

if(plant.sensorID!=null){
  console.log('sensor: '+plant.sensorID)
axios.get('http://localhost:8080/sensor/soilMoisture/'+plant.sensorID).then((Response)=>{


var soilMoisture=[]
Response.data.map((data,key)=>{
soilMoisture.push({name:'',score:data.curMoist})
})
console.log(soilMoisture)
  //clear old charts

  d3.selectAll('svg').remove()
    
DrawGraph(soilMoisture,'d3-container','royalblue')


})
}

  })

  if(!redirectToGarden)
  { 
    return (
      <div>
      
      <section id="hero" className="d-flex align-items-center">
         <section id="specials" className="specials" style={{backgroundColor: 'rgba(245, 245, 220,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}>
           <div className="container" data-aos="fade-up"  >
            <div className="section-title" >
              <br></br><br></br><br></br><br></br>
              <h2 style={{fontSize:'30px'}}>{plant.species}</h2>
              <br></br>
              <h2 style={{fontSize:'10px'}}>{"ID:"+plantID}</h2>


              </div>
              <div className="row" data-aos="fade-up" data-aos-delay={100}>
                <div className="col-lg-3"> {/*left buttons*/}
                    <ul className="nav nav-tabs flex-column">
                    <li className="nav-item">
                      <Link className="nav-link" to='/singlegarden'>All Gardens </Link>
                      </li>
                      <li className="nav-item">
                      <Link className="nav-link active show" to='/singlegarden'>Balcony </Link>
                      </li>
                      <li className="nav-item">
                      <Link className="nav-link" to='/singlegarden'>Living Room </Link>
                      </li>
                      <li className="nav-item">
                      <Link className="nav-link" to='/singlegarden'>Bedroom </Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to='/addagarden'>Add A Garden </Link>
                      </li>
                    </ul>
                    
                <form style= {{fontSize: '10px'}}  onSubmit={(e)=>{
            addSensor(e,plantID)
            setSensorAdded(true)
          }}>
               <input type="submit" className="fadeIn fourth"  value="Add sensor"/><br/>
            
            </form>

            <button onClick={()=>{
                            axios.delete('http://localhost:8080/plant/',{data:{plantID:plantID,gardenID:plant.gardenID}})
                            setRedirectToGarden(true)
                          }}> Delete plant </button>
                          
                   <li className="nav-item">
                  <Link className="nav-link" to={`/editPlant/${plantID}`}>Edit plant </Link>
                  </li>
        
                </div>
                <div className="col-lg-8 details order-2 order-lg-1">{/*main content*/}

                  <nav className="nav-menu d-none d-lg-block" > {/*display*/}
                      <ul>
                      <li><a style={{fontSize:'22px'}}>Display:</a></li>
                      <li class="active"><Link to="/mygardens" style={{fontSize:'20px'}} >Last 24 Hours</Link></li>
                      <li><Link to="/mygardens" style={{fontSize:'20px'}} >Last 3 Days</Link></li>
                      <li><Link to="/mygardens" style={{fontSize:'20px'}} >Last Week</Link></li>
                      <li></li>
          
                      </ul>
                    </nav>
                  <br></br>
                  <table style={{width: '80%'}}> {/*graphs */}
                    <tbody><tr>
                        {/* <th>Light Exposure</th>
                        <th>Soil Moisure</th>
                        <th>Temperature</th>
                      </tr>
                      <tr>
                        <td><img src={light24}width={'150px'}></img></td> 
                        <td><img src={soil24}width={'150px'}></img></td> 
                        <td> <img src={temp24}width={'150px'}></img></td>  */}

                        <div id='d3-container'></div>
                        <br></br>
                        <div id='temperature'></div>
                      </tr>

                    </tbody></table>
                    
            <form name="addAPhoto" action="/html/tags/html_form_tag_action.cfm" method="post" onSubmit={(e)=>{
        addPhoto(e,plantID)
        setPhotoAdded(true)}}>
        <input style= {{fontSize: '12px'}} type="text"  id="photoLink" className="fadeIn second" name="addAGarden" placeholder="Name"  />
        <input type="submit" value="send" defaultValue="Submit" 
        style={{backgroundColor: 'green', color: 'white', padding: '8px', fontSize: '10px', border: 'none'}} />
      </form>
               
                    <div className="col-md-12" style={{width: '75%'}}>  {/*timeline*/}
                          <div style={{display: 'inline-block', width: '100%', overflowY: 'auto'}}>
                            <ul className="timeline timeline-horizontal">
                              <li className="timeline-item" >
                                <div className="timeline-badge primary">
                                <a style={{fontSize:'11px' ,color:'white'}}>14.01.20</a></div>
                                <div className="timeline-panel">
                                <div className="timeline-heading">
                                <img src={Ivy0} width={'60px'}></img>
                                  </div>
                                </div>
                              </li>
                              <li className="timeline-item" >
                                <div className="timeline-badge primary">
                                <a style={{fontSize:'11px' ,color:'white'}}>14.02.20</a></div>
                                <div className="timeline-panel">
                                <div className="timeline-heading">
                                <img src={Ivy1} width={'60px'}></img>
                                  </div>
                                </div>
                              </li> <li className="timeline-item" >
                                <div className="timeline-badge primary">
                                <a style={{fontSize:'11px' ,color:'white'}}>14.03.20</a></div>
                                <div className="timeline-panel">
                                <div className="timeline-heading">
                                <img src={Ivy} width={'60px'}></img>
                                  </div>
                                </div>
                              </li>
                            </ul>
                            
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
  
  else{
  return(<Redirect to="/mygardens"/>)}
}

  
  function addSensor(e,plantID){

    e.preventDefault();

    const newSensor= { 
      temperature:data.data.temp[0],
      light:data.data.light[0],
      soil:data.data.soil[0],
      plantID:plantID
    }
    axios.post('http://localhost:8080/sensor/',newSensor);
   
  }
  
  function addPhoto(e,plantID)
  {
    e.preventDefault();
    document.getElementById('photoLink').value='Uploaded';
    const newPhoto= {
      link:document.getElementById('photoLink').value,
      plantID:plantID}
   
    axios.post('http://localhost:8080/photo/',newPhoto);
   
  }
