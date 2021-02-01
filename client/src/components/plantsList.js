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
    axios.get('http://localhost:8080/plant/'+gardenID).then(Response=>{
        if(plants.length!=Response.data.length)
        setPlants(Response.data)

})
if(plants.length)
return(

    <div>

                        <table style={{width: '70%'}}>
                        <tbody><tr>
                            <th>Species</th>
                            <th>Status</th>
                            <th>Cause</th>
                          </tr>
                          <br></br>
                         {plants.map((data,key)=>{
                             return <PlantComponent plantid={data._id} key={key}/>

                         })}
                          <br></br>

                          <tr>
                          <Link to="/plant" >Pothos</Link>
                            <td><img src={statusYellow} width={"30px"}></img></td>
                            <td>Lack Of Water</td>
                          </tr>
                          <br></br>

                          <tr>
                        
                          <Link to = {`/addaplantbyuser/${gardenID}`} >Add A Plant</Link>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody></table>
                        <br></br>
                     
                          <h4> Tip From Us!</h4>
                        <h5> Based on information we collected, we recommend you to plant:</h5>
                        <h4> Cyclamen! <img src={Cyclamen} width={40} /></h4>
                        <br></br>



    </div>
);

else 
return (<dib>

<tr>
                        
                        <Link to = {`/addaplantbyuser/${gardenID}`} >Add A Plant</Link>
                          <td></td>
                          <td></td>
 </tr>
</dib>
);
}