import { Link } from 'react-router-dom';
import statusRed from '../Images/status/red.jpg';
import statusYellow from '../Images/status/yellow.jpg';
import statusGreen from '../Images/status/green.jpg';
import statusBlue from '../Images/status/statusBlue.png';

import React from 'react';
import axios from 'axios'

 
export default function PlantComponent({ plantName, plantid, plantsensorid }) { 
    const StatusColor = () => {
 
        const [plant, setPlant] = React.useState();
        React.useEffect(() => {
            if (plantid != null) {
                var url = 'http://localhost:8080/plant/' + plantid;
                axios.get(url).then((Response) => {
                    if (!plant) {
                        setPlant(Response.data);
                    }
                })
            }
        }, []);
        if(plant)
            if (plant.sensorID != null) {
                if(plant.healthStatus==3)
                    return statusRed
                if(plant.healthStatus==2)
                    return statusYellow
                    return statusGreen
            }         
                else {
                    return statusBlue;
                }
    }

return (
    <div  style={{fontFamily: "Open Sans"}}>
        <tr>
            <Link style={{fontSize:'20px'}} to={`/plant/${plantid}`} >{plantName}</Link>
            <td></td>
            <td>  &nbsp;&nbsp; <img style={{width:'30px',height:'30px'}} src={StatusColor()}
                width={"30px"}></img></td>
            <td></td>
        </tr>
    </div>
);
 

}