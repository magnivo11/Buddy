import {Link} from 'react-router-dom';
import axios from 'axios';
import React from 'react'
import PlantsList from './plantsList'
import ButtonsList from './ButtonsList';


export default function SingleGarden(){
  var index=window.location.toString().lastIndexOf('/')+1
  const gardenID=window.location.toString().substring(index)
  const ownerID= window.sessionStorage.getItem('userID');
  const [garden,setGarden]=React.useState({_id:''});
 
  if(garden._id!=gardenID)
   axios.get(process.env.REACT_APP_SERVER_URL+'/garden/find/'+gardenID).then((Response)=> {
    if(Response.data){

    if(garden._id!==Response.data._id)
    {
      setGarden(Response.data);
    }
  }
  })


  const gardenName = garden.name;

  return (

  <div  style={{fontFamily: "Open Sans"}}>
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
         <section id="hero"   style={{ overflow: 'scroll' }}>
        <section id="specials" className="specials" style={{ backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop: '0%', marginLeft: '9%', marginRight: '9%' }}>
          <div data-aos="fade-up"  >
            <div className="row" data-aos="fade-up" data-aos-delay={100}>
              <div className="col-lg-3">
              <ul className="nav nav-tabs flex-column ">
                      {/*Title*/}
                      <div className="section-title" >
                        <h2 style={{fontSize:'36px'}}></h2>
                      </div>
                      <div className="d-none d-lg-block buttonsTop">
                       <ButtonsList ownerID= {ownerID}/>
                  </div>
                  </ul>
              </div>
              <div className="col-lg-9 mt-4 mt-lg-0">
                  <div className="tab-content">
                     <div>
                        <div className="section-title " >
                           <p className="gardenName">{gardenName} </p>
                          <h2>{garden.direction},{garden.surrounding},{garden.directSun?"sunny":"shady"}</h2>
                           {garden.currentTemp&& <div>
                            {garden.currentTemp.value&&
                          <p style={{fontSize:'35px'}}>{garden.currentTemp.value}° </p>
                            }</div>
                          }
                       </div>
                        <PlantsList gardenID={gardenID} gardenName={gardenName}/> 
                        <div className='inner' style={{display:'inline-block'}}>
                          <Link to={`/editgarden/${gardenID}`} style={{width:'120px',background: 'white'}}className="button" >
                          <span style={{color:'black'}}>Edit Garden</span></Link>  &nbsp;
                          <button style={{width:'120px',background: 'white'}}className="button" type="submit"
                          onClick={()=>{
                            axios.delete(process.env.REACT_APP_SERVER_URL+'/garden/',{data:{gardenID:gardenID,userID:ownerID}})
                            window.location='/myGardens'}}> 
                          <span style={{color:'black'}} >Delete Garden</span></button>
                      </div>
                    </div>
                 </div>
               </div> 
            </div>
          </div>
        </section>
      </section>
    </div>

)};