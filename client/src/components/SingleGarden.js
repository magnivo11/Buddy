import { TableRow } from '@material-ui/core';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Cyclamen from '../Images/cyclamen.JPG';
import statusRed from '../Images/status/red.jpg';
import Header from './Header';
import AddAPlantByUser from './AddAPlantByUser';
import statusGreen from '../Images/status/green.jpg';
import statusYellow from '../Images/status/yellow.jpg';
import {Link} from 'react-router-dom';
import axios from 'axios';
import React from 'react'
import DataContext from '../DataContext'
import PlantComponent from './PlantComponent';
import PlantsList from './PlantsList';
import ButtonsList from './ButtonsList';





export default function SingleGarden(){
  var index=window.location.toString().lastIndexOf('/')+1
  const gardenID=window.location.toString().substring(index)
  const user=React.useContext(DataContext);
  const ownerID=user._id;

  const[redirectToGardens,setRedirectToGardens]=React.useState(false);

  const [garden,setGarden]=React.useState({_id:null});
  axios.get('http://localhost:8080/garden/find/'+gardenID).then((Response)=> {
    if(Response.data){

    if(garden._id!=Response.data._id)
    {
      setGarden(Response.data);
    }
  }
  })

  const gardenName = garden.name;
  
if(!redirectToGardens)
{
 return (

   <div>
  

    <section id="hero" className="d-flex align-items-center">
    <section id="specials" className="specials" style={{backgroundColor: 'rgba(245, 245, 220,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}>
        <div className="container" data-aos="fade-up"  >
            <div className="row" data-aos="fade-up" data-aos-delay={100}>
            <div className="col-lg-3">
                <ul className="nav nav-tabs flex-column">
                  {/*Title*/}
                  <div className="section-title" >
                    <h2 style={{fontSize:'25px'}}>My Gardnes</h2>
                    <p style={{fontSize:'30px'}}>{gardenName}</p>
                  </div>
                  {/*Left buttons*/}
                  <ButtonsList ownerID= {user._id}/>

                </ul>
            </div>

            {/*Middle part*/}

            <div className="col-lg-9 mt-4 mt-lg-0">
                <div className="tab-content">
                <div className="tab-pane active show" id="tab-1">
                    <div className="row">
                    {/*Text*/}
                    <br></br>
                    <br></br>
                    <br></br>
                <img src={garden.photo} ></img>

                    <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>Plants you grow in this garden:</h3>
                    </div>
                 
                    </div>

                    <PlantsList gardenID={gardenID}/>  
                   
                        
                          <button onClick={()=>{
                            axios.delete('http://localhost:8080/garden/',{data:{gardenID:gardenID,userID:user._id}})
                            setRedirectToGardens(true)
                          }}> Delete garden </button>

                   <li className="nav-item">
                  <Link className="nav-link" to={`/editgarden/${gardenID}`}>Edit garden </Link>
                  </li>
        
                      
                      
              {/*end of table*/}
                    </div>
                  </div>
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