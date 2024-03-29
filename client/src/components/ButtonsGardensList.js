import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ButtonComponent from './ButtonComponent'


export default function ButtonsGardensList({ gardenID,setPlantID }) {
    const [plants,setPlants]=React.useState([]);
    axios.get(process.env.REACT_APP_SERVER_URL+'/plant/bygarden/'+gardenID).then(Response=>{
     if(plants.length!=Response.data.length)
     setPlants(Response.data)});
    if (plants.length<1)
    return(
        <div>
            <ul className="nav nav-tabs flex-column">
                <li className="nav-item">
            <Link className="nav-link" style={{color:'rgb(205, 164, 94)'}} to={`/addaplantbyuser/${gardenID}`}>Add A Plant! </Link>
                </li>
            </ul>       
        </div>
    );
    return( 
        <div  style={{fontFamily: "Open Sans"}}>
        <ul className="nav nav-tabs flex-column">
        <li className="nav-item">
              <Link  className="nav-link" style={{color:'rgb(205, 164, 94)'}} to={`/singlegarden/${gardenID}`}>All Plants </Link>
            </li>
            </ul>
                {plants.map((data,key)=>{
                return <ButtonComponent setPlantID={setPlantID} id={data._id} name={data.species} type="/plant/" key={key}/>
            })}
            <ul className="nav nav-tabs flex-column">
                    <li className="nav-item">
               <Link className="nav-link" style={{color:'rgb(205, 164, 94)'}} to={`/addaplantbyuser/${gardenID}`}>Add A Plant! </Link>
            </li>
            </ul>
               
            </div>
    );


}