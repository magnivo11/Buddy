import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
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
  // const user=React.useContext(DataContext);
  // const ownerID=user._id;
  const ownerID= window.sessionStorage.getItem('userID');
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
                        <h2 style={{fontSize:'36px'}}>My Gardnes</h2>
                        <p style={{fontSize:'30px'}}>{gardenName}</p>
                      </div>
                    {/*Left buttons*/}
                    <ButtonsList ownerID= {ownerID}/>
                  </ul>
              </div>
              {/*Middle part*/}
              
            <div className="col-lg-9 mt-4 mt-lg-0">
              <div className="tab-content">
                   <div>
                    <PlantsList gardenID={gardenID}/> 
                    <button style={{color:"black",background:"white",borderWidth:"thin",fontSize:"14px" , height:"42px",width:"110px"}} onClick={()=>{
                        axios.delete('http://localhost:8080/garden/',{data:{gardenID:gardenID,userID:ownerID}})
                        setRedirectToGardens(true)
                      }}> Delete garden </button>
                    <li className="nav-item">
                       <Link style={{color:"black",background:"white",fontWeight:"normal",border:"black",fontSize:"14px" ,height:"40px" ,width:"110px"}}
                       className="nav-link" to={`/editgarden/${gardenID}`}>Edit garden </Link>
                    </li> 
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