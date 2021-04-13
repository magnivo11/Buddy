import React from 'react'
import axios from 'axios';
import PlantComponent from './PlantComponent'
import {Link} from 'react-router-dom';


export default function PlantsList({gardenID}){

  const [plantListChange,setChange]=React.useState(false);
  const [plants,setPlants]=React.useState([]);
  axios.get('http://localhost:8080/plant/bygarden/'+gardenID).then(Response=>{
    if(plants.length!=Response.data.length)
    setPlants(Response.data)});


if(plants.length)
return(
  <div style={{fontFamily: "Open Sans"}}>
      <div className="row"> <br></br><br></br><br></br>
          <div className="nav-menu d-none d-lg-block">
                <p style={{fontSize:"25px",color:'white', textAlign:'left'}}className="nav-menu d-none d-lg-block">Plants List:</p>
            </div>
        </div>
    <table style={{width: '100%'}}>
       <tbody>
         {plants.map((data,key)=>{
          return <PlantComponent plantName= {data.species} plantsensorid={data.sensorID} plantid={data._id} key={key}/>})}<br></br>
          <Link to = {`/addaplantbyuser/${gardenID}`} style={{width:'120px',background: 'white'}}className="button" >
          <span style={{color:'black'}}>Add A Plant</span></Link>
        </tbody>
    </table>
  </div>
);

else 
return (
  <div>
    <div className="nav-menu d-none d-lg-block">
      <p style={{fontSize:"25px",color:'white', textAlign:'left'}}className="nav-menu d-none d-lg-block">Looks like you have no plants yet</p>
      <p style={{fontSize:"20px",color:'white', textAlign:'left'}}className="nav-menu d-none d-lg-block">Create your garden now!</p>
   </div> <br></br>
      <Link to = {`/addaplantbyuser/${gardenID}`} style={{width:'120px',background: 'white'}}className="button" >
      <span style={{color:'black'}}>Add A Plant</span></Link><br></br>
  </div>
  );
}