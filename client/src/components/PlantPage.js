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
import ButtonsList from './ButtonsList';
import * as d3 from "d3"
import { forceCenter } from 'd3';


const data = require ('../files/data.json'); 

export default function Plant(){

  const[soilMoisture,setSoilmoisture]=React.useState([])
  const[sensorAdded,setSensorAdded]=React.useState(false)
  const ownerID= window.sessionStorage.getItem('userID');
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

    //this is a fake data just for the tset
    const humidity = [
      { name: '10.3.21', score: 80 },
      { name: '11.3.21', score: 76 },
      { name: '12.3.21', score: 90 },
      { name: '13.3.21', score: 82 },
      { name: '14.3.21', score: 90 },
      { name: '15.3.21', score: 75 },
      { name: '16.3.21', score: 86 },
      { name: '10.3.21', score: 80 },
      { name: '10.3.21', score: 80 },
      { name: '10.3.21', score: 80 },
      { name: '10.3.21', score: 80 },
      { name: '10.3.21', score: 80 },
      { name: '10.3.21', score: 80 },
      { name: '10.3.21', score: 80 },
      { name: '10.3.21', score: 80 }
    ];


    const temperature = [
      { name: '10.3.21', score: 40 },
      { name: '11.3.21', score: 50 },
      { name: '12.3.21', score: 60 },
      { name: '13.3.21', score: 80 },
      { name: '14.3.21', score: 70 },
      { name: '15.3.21', score: 75 },
      { name: '16.3.21', score: 50 },
    ];


   
// pick the data you want to show,the ID of the container in the html,the color of each bar

if(plant.sensorID!=null){
  console.log('sensor: '+plant.sensorID)
axios.get('http://localhost:8080/sensor/soilMoisture/'+plant.sensorID).then((Response)=>{


var soilMoisture=[]
Response.data.map((data,key)=>{
soilMoisture.push({name:data.date,score:data.curMoist})
})
console.log(soilMoisture)
  //clear old charts

  d3.selectAll('svg').remove()
    
DrawGraph(soilMoisture,'d3-container','#78281F')


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
              <br></br>
              <br></br>
              </div>
              <div className="row" data-aos="fade-up" data-aos-delay={100}>
                       {/*Left buttons*/}
                       <ButtonsList ownerID= {ownerID}/>
                           
                    
                <div className="col-lg-8 details order-2 order-lg-1">{/*main content*/}
                <h2 style={{fontSize:'30px'}}>{plant.species}</h2>

                  <nav className="nav-menu d-none d-lg-block" > {/*display*/}
                      <ul>
                      <li><a style={{fontSize:'20px'}}>Soil moistrue of the last 3 days:</a></li>
                      
          
                      </ul>
                    </nav>
                  <br></br>
                
                        <div id='d3-container'></div>
                        <br></br>
                        <div id='temperature'></div>
                 
         
            <li className="fadeIn fourth">
                       <Link style={{color:"black",background:"white",borderWidth:"thin",fontWeight:"normal",border:"black",fontSize:"14px" ,height:"30px" ,width:"110px"}}
                       className="nav-link" to={`/editPlant/${plantID}`}>Edit plant  </Link>
          </li>
          <br></br>
          <button  className="fadeIn fourth" style={{color:"black",background:"white",borderWidth:"thin",fontSize:"14px" , height:"30px",width:"110px"}} onClick={()=>{
                            axios.delete('http://localhost:8080/plant/',{data:{plantID:plantID,gardenID:plant.gardenID}})
                            setRedirectToGarden(true)
                          }}> Delete plant </button>
                   <form style= {{fontSize: '8px'}}  onSubmit={(e)=>{
            addSensor(e,plantID)
            setSensorAdded(true)
          }}>
               <input type="submit" className="fadeIn fourth"  style={{
                 backgroundColor:'#463827',color:'white',
                 align:'center', forceCenter:true}}value="Add sensor"/><br/>
            </form>
                   
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
      plantID:plantID
    }
    console.log(newSensor);
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



