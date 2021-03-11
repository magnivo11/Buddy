import DataContext from '../DataContext'
import React from 'react'
import axios from 'axios';
import PlantComponent from './PlantComponent'
import {Link} from 'react-router-dom';


export default function PlantsList({gardenID}){

  const [plants,setPlants]=React.useState([]);
    axios.get('http://localhost:8080/plant/bygarden/'+gardenID).then(Response=>{
        if(plants.length!=Response.data.length)
        setPlants(Response.data)

})
console.log("io")
if(plants.length)
return(
  <div>
      <div className="row">
                      {/*Text*/}
                      <br></br>
                      <br></br>
                      <br></br>
                        <div className="nav-menu d-none d-lg-block">
                            <h1 style={{fontSize:"30px"}}className="nav-menu d-none d-lg-block">Plants you grow in this garden:</h1>
                        </div>
                    </div>
    <table style={{width: '100%'}}>
    <tbody>
      {plants.map((data,key)=>{

          return <PlantComponent plantName= {data.species} plantsensorid={data.sensorID} plantid={data._id} key={key}/>
  
       })}
          <li className="nav-item">
                       <Link style={{color:"black",background:"white",borderWidth:"thin",fontWeight:"normal",border:"black",fontSize:"14px" ,height:"40px" ,width:"110px"}}
                       className="nav-link" to = {`/addaplantbyuser/${gardenID}`} >Add A Plant </Link>
          </li>
       
     
    </tbody>
    </table>
    <br></br>
  
    </div>



);

else 
return (<div>
 <li className="nav-item">
                       <Link style={{color:"black",background:"white",borderWidth:"thin",fontWeight:"normal",border:"black",fontSize:"14px" ,height:"40px" ,width:"110px"}}
                       className="nav-link" to = {`/addaplantbyuser/${gardenID}`} >Add A Plant </Link>
          </li>
          <br></br>
</div>
);
}