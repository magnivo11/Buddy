import DataContext from '../DataContext'
import React from 'react'
import axios from 'axios';
import PlantComponent from './PlantComponent'
import {Link} from 'react-router-dom';
import statusGreen from '../Images/status/green.jpg';
import statusYellow from '../Images/status/yellow.jpg';
import Cyclamen from '../Images/cyclamen.JPG';
import statusRed from '../Images/status/red.jpg';

export default function PlantsList({gardenID}){

   const [plants,setPlants]=React.useState([])
    axios.get('http://localhost:8080/plant/bygarden/'+gardenID).then(Response=>{
        if(plants.length!=Response.data.length)
        setPlants(Response.data)

})
if(plants.length)
return(
  <div>
    <table style={{width: '70%'}}>
    <tbody>
      <tr>
        <th>Species</th>
        <th>Status</th>
        <th>Cause</th>
      </tr>
      {plants.map((data,key)=>{
          return <PlantComponent plantName= {data.species} plantsensorid={data.sensorID} plantid={data._id} key={key}/>

      })}

      <tr>
    
      <Link to = {`/addaplantbyuser/${gardenID}`} >Add A Plant</Link>
        <td></td>
        <td></td>
      </tr>
    </tbody>
    </table>
    <br></br>
  
    </div>



);

else 
return (<div>

<tr>
                        
                        <Link to = {`/addaplantbyuser/${gardenID}`} >Add A Plant</Link>
                          <td></td>
                          <td></td>
 </tr>
</div>
);
}