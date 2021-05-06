import { Link } from 'react-router-dom';
import statusRed from '../Images/status/red.jpg';
import statusYellow from '../Images/status/yellow.jpg';
import statusGreen from '../Images/status/green.jpg';
import statusBlue from '../Images/status/statusBlue.png';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import axios from 'axios'

 
export default function PlantComponent({plant}) { 


    const d = new Date(plant.lastIrrigation);
    const now = new Date();
   

    var diff = (now-d);
    var diffDays = Math.floor(diff / 86400000); // days
    var diffHrs = Math.floor((diff % 86400000) / 3600000); // hours
    var diffMins = Math.floor((diff/1000)/60)%60 ;
    var timestamp = diffMins;
    console.log(timestamp)
    if (diffHrs){
        if (diffHrs==1) timestamp = diffHrs + " hour, " + timestamp;
        else (timestamp = diffHrs + " hours, " + timestamp);
    }
    if (diffDays){
        if (diffDays==1) timestamp = diffDays + " day, " + timestamp;
        else (timestamp = diffDays + " days, " + timestamp);
    }

    console.log(timestamp)
    const StatusColor = () => {
 
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
            <TableRow key={plant._id}>
    <TableCell component="th" scope="row">
      {plant.species}
    </TableCell>
    <TableCell align="right"><img style={{width:'30px',height:'30px'}} src={StatusColor()}
                width={"30px"}></img></TableCell>
    <TableCell align="right">{timestamp} min ago</TableCell>
    <TableCell align="right">{plant.lastSoil.value}</TableCell>
    <TableCell align="right">{plant.lastTemp.value}°</TableCell>
    <TableCell align="right">{plant.lastLight.value}</TableCell>

  </TableRow>
        {/* <tr>
            <Link style={{fontSize:'20px'}} to={`/plant/${plant._id}`} >{plant.species}</Link>
            <td></td>
            <td>  &nbsp;&nbsp; <img style={{width:'30px',height:'30px'}} src={StatusColor()}
                width={"30px"}></img></td>
            <td></td>
            <td style={{fontSize:"10px",color:'white', textAlign:'left'}}className="nav-menu d-none d-lg-block"> 
                last irrigation: {timestamp} min ago  soilmoisture: {plant.lastSoil.value}  temperature:{plant.lastTemp.value}°  sun exposure: {plant.lastLight.value} </td>
        </tr> */}
    </div>
);
 

}