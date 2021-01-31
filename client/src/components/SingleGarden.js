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




export default function SingleGarden(){
  var index=window.location.toString().lastIndexOf('/')+1
  const gardenID=window.location.toString().substring(index)
  const user=React.useContext(DataContext);
  const[redirectToGardens,setRedirectToGardens]=React.useState(false)
  
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
                    <h2 style={{fontSize:'35px'}}>My Gardnes</h2>
                    <p style={{fontSize:'30px'}}>{gardenID}</p>
                  </div>
                  {/*Left buttons*/}

                <li className="nav-item">
                <Link className="nav-link" to='/singlegarden'>All Gardens </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link active show" to='/singlegarden'>Balcony </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to='/singlegarden'>Living Room </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to='/singlegarden'>Bedroom </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/addagarden'>Add A Garden </Link>
                </li>
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
                

                    <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>Plants you grow in this garden:</h3>
                    </div>
                   
                    </div>
                    <table style={{width: '70%'}}>
                        <tbody><tr>
                            <th>Species</th>
                            <th>Status</th>
                            <th>Cause</th>
                          </tr>
                          <br></br>
                          <tr>
                          <Link to="/plant" >Ivy</Link>
                            <td><img src={statusRed} width={"30px"}></img></td>
                            <td>Low Humidity</td>

                          </tr>
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
                        
                          <button onClick={()=>{
                            axios.delete('http://localhost:8080/garden/',{data:{gardenID:gardenID,userID:user._id}})
                            setRedirectToGardens(true)
                          }}> delete garden </button>
        
                      
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
                        else
                        return(<Redirect to="/mygardens"/>)
}