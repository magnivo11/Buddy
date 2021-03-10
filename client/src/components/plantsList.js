import DataContext from '../DataContext'
import React from 'react'
import axios from 'axios';
import PlantComponent from './PlantComponent'
import {Link} from 'react-router-dom';


export default function PlantsList({gardenID}){

   const [plants,setPlants]=React.useState([])
    axios.get('http://localhost:8080/plant/bygarden/'+gardenID).then(Response=>{
        if(plants.length!=Response.data.length)
        setPlants(Response.data)

})
if(plants.length)
return(
  <div>
      <div className="row">
                      {/*Text*/}
                      <br></br>
                      <br></br>
                      <br></br>
                        <div className="col-lg-8 details order-2 order-lg-1">
                            <h3>Plants you grow in this garden:</h3>
                        </div>
                    </div>
    <table style={{width: '100%'}}>
    <tbody>
      <tr>
        <th>Species</th>
        <th>Status</th>
        <th>Cause</th>
      </tr>
      {plants.map((data,key)=>{
          return  <tr> <PlantComponent plantName= {data.species} plantid={data._id} key={key}/></tr>
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

<tr>
                        
                        <Link to = {`/addaplantbyuser/${gardenID}`} >Add A Plant</Link>
                          <td></td>
                          <td></td>
 </tr>
</div>
);
}