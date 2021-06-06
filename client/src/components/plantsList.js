
import React from 'react'
import axios from 'axios';
import statusRed from '../Images/status/red.jpg';
import statusYellow from '../Images/status/yellow.jpg';
import statusGreen from '../Images/status/green.jpg';
import statusBlue from '../Images/status/statusBlue.png';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';




 export default function PlantsList({gardenID}){
  const classes = useStyles();
    const [plantListChange,setChange]=React.useState(false);
  const [plants,setPlants]=React.useState([]);
  React.useEffect(()=>{
    axios.get(process.env.REACT_APP_SERVER_URL+'/plant/bygarden/'+gardenID).then(Response=>{
      setPlants(Response.data)});

  },[gardenID])
   
 if(plants.length){
  return (
    <div>
    <Table  className={classes.root}>
      <TableHead>
          <TableRow >
            <TableCell className={classes.title}>Plant</TableCell>
            <TableCell className={classes.title} >Status</TableCell>
            <TableCell className={classes.title} align="center">Last Irrigation</TableCell>
            <TableCell className={classes.title} align="center">Soil Moisture</TableCell>
            <TableCell className={classes.titleNotMobile} align="center">Temperature</TableCell>
            <TableCell className={classes.titleNotMobile} align="center">Sun Exposure</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {plants.map((plant) => (
            <TableRow key={plant._id}>
              <TableCell className={classes.table} component="th" scope="row" align="left">
              <Link className={classes.species} to={`/plant/${plant._id}`} >{plant.species}</Link>
              </TableCell>
              <TableCell className={classes.table} ><img className="tableStatus" src={StatusColor(plant.sensorID,plant.healthStatus)}
                width={"30px"}></img></TableCell>
              <TableCell className={classes.table} align="center">{getLastIrrigation(plant.lastIrrigation)+" min ago"}</TableCell>
              <TableCell className={classes.table} align="center">{plant.lastSoil.value}</TableCell>
              <TableCell className={classes.tableNotMobile} align="center">{plant.lastTemp.value}°</TableCell>
              <TableCell className={classes.tableNotMobile} align="center">{plant.lastLight.value}</TableCell>
            </TableRow>
          ))}  
        </TableBody>
      </Table>
      <br/>
      <Link to = {`/addaplantbyuser/${gardenID}`} style={{width:'120px',background: '#84996f'}}className="button" >
          <span style={{color:'white'}}>Add A Plant</span></Link>
    </div>
  );
}
 
 else{
  return (
      <div style={{fontFamily: "Open Sans"}}>
          <p className="section-title" style={{fontSize:"22px",color:'white', textAlign:'left'}}>Looks like you have no plants yet</p>
          <p className="section-title"  style={{fontSize:"18px",color:'white', textAlign:'left'}}>Create your garden now!</p>
          <Link to = {`/addaplantbyuser/${gardenID}`} style={{width:'120px',background: '#84996f'}}className="button" >
          <span style={{color:'white'}}>Add A Plant</span></Link><br></br>
      </div>
  );}
 }
const getLastIrrigation= (lastIrrigation)=>{
  const d = new Date(lastIrrigation);
    const now = new Date();
    var diff = (now-d);
    var diffDays = Math.floor(diff / 86400000); // days
    var diffHrs = Math.floor((diff % 86400000) / 3600000); // hours
    var diffMins = Math.floor((diff/1000)/60)%60 ;
    var timestamp = diffMins;
    if (diffHrs){
        if (diffHrs==1) timestamp = diffHrs + " hour, " + timestamp;
        else (timestamp = diffHrs + " hours, " + timestamp);
    }
    if (diffDays){
        if (diffDays==1) timestamp = diffDays + " day, " + timestamp;
        else (timestamp = diffDays + " days, " + timestamp);
    }
return timestamp;
  }
    const StatusColor = (sensorID,healthStatus) => {
 
    if (sensorID != null) {
        if(healthStatus==3)
            return statusRed
        if(healthStatus==2)
            return statusYellow
            return statusGreen
    }         
        else {
            return statusBlue;
        }
      }
      const useStyles = makeStyles({
        root: {
          maxWidth:700,
        },
        title: {
          fontFamily:"Open Sans",
          maxWidth:100,
          fontSize:"16px"
        },
        titleNotMobile: {
          fontFamily:"Open Sans",
          maxWidth:100,
          fontSize:"16px"
        },
        table: {
          fontFamily:"Open Sans",
          maxWidth:100,
          maxHeight:100,
          fontSize:"14px"
        },
        tableNotMobile: {
          fontFamily:"Open Sans",
          maxWidth:100,
          maxHeight:100,
          fontSize:"14px"
        },
        species: {
          fontSize:"15px",
          color:"black",
          fontWeight:"bolder"
        },
        "@media (max-width: 700px)": {
          root: {
            maxWidth:400,
          },  
          title: {
            fontFamily:"Open Sans",
            maxWidth:30,
            fontSize:"11px"
          },
          species: {
            fontSize:"11px"
          },
          table: {
            fontFamily:"Open Sans",
            maxWidth:30,
            maxHeight:100,
            fontSize:"9px"
          },
          tableNotMobile:{
            display:"none"
          },
          titleNotMobile:{
            display:"none"
          }
          },
          "@media (max-width: 1000px)": {
            root: {
              maxWidth:600,
            }, 
          }

      });


// import React from 'react'
// import axios from 'axios';
// import PlantComponent from './PlantComponent'
// import {Link} from 'react-router-dom';


// export default function PlantsList({gardenID}){

//   const [plantListChange,setChange]=React.useState(false);
//   const [plants,setPlants]=React.useState([]);
// //      axios.get('http://localhost:8080/plant/bygarden/'+gardenID).then(Response=>{
// //         if(plants.length!==Response.data.length)
// //         setPlants(Response.data)
//    axios.get('http://localhost:8080/plant/bygarden/'+gardenID).then(Response=>{
//     if(plants.length!=Response.data.length)
//     setPlants(Response.data)});

 
// if(plants.length)
// return(
//   <div style={{fontFamily: "Open Sans"}}>
//       <div className="row"> 
//           <div className="nav-menu d-none d-lg-block">
//                 <p style={{fontSize:"25px",color:'white', textAlign:'left'}}className="nav-menu d-none d-lg-block">Plants List:</p>
//             </div>
//         </div>
//     <table style={{width: '100%'}}>
//        <tbody>
//          {plants.map((data,key)=>{
//           return <PlantComponent plant={data} plantName= {data.species} plantsensorid={data.sensorID} plantid={data._id} key={key}/>})}<br></br>
//           <Link to = {`/addaplantbyuser/${gardenID}`} style={{width:'120px',background: 'white'}}className="button" >
//           <span style={{color:'black'}}>Add A Plant</span></Link>
//         </tbody>
//     </table>
//   </div>
// );

// else 
// return (
//   <div style={{fontFamily: "Open Sans"}}>
//       <p style={{fontSize:"25px",color:'white', textAlign:'left'}}>Looks like you have no plants yet</p>
//       <p style={{fontSize:"20px",color:'white', textAlign:'left'}}className="nav-menu d-none d-lg-block">Create your garden now!</p>
//       <Link to = {`/addaplantbyuser/${gardenID}`} style={{width:'120px',background: 'white'}}className="button" >
//       <span style={{color:'black'}}>Add A Plant</span></Link><br></br>
//   </div>
//   );
// }