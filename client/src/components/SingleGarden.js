import { TableRow } from '@material-ui/core';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Cyclamen from '../Images/cyclamen.JPG';
import statusRed from '../Images/status/red.jpg';
import Header from './Header';
import AddAPlantByUser from './AddAPlantByUser';
import statusGreen from '../Images/status/green.jpg';
import statusYellow from '../Images/status/yellow.jpg';
import {Link} from 'react-router-dom'


export default function SingleGarden(){
  var index=window.location.toString().lastIndexOf('/')+1
  const gardenID=window.location.toString().substring(index)
  


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
                    <p style={{fontSize:'30px'}}>balcony</p>
                  </div>
                  {/*Left buttons*/}

                  <li className="nav-item">
                    <a className="nav-link"   href="/mygardens">All Gardens</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active show" href="/singlegarden">Balcony</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link"   href="/singlegarden">Living Room</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link"  href="/singlegarden">Bedroom</a>
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
                            <a  href="/plant">Ivy</a>
                            <td><img src={statusRed} width={"30px"}></img></td>
                            <td>Low Humidity</td>

                          </tr>
                          <br></br>

                          <tr>
                          <a  href="/plant">Pothos</a>
                            <td><img src={statusYellow} width={"30px"}></img></td>
                            <td>Lack Of Water</td>
                          </tr>
                          <br></br>

                          <tr>
                        
                          <Link to="/addaplantbyuser/123" >Add A Plant</Link>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody></table>
                        <br></br>
                     
                          <h4> Tip From Us!</h4>
                        <h5> Based on information we collected, we recommend you to plant:</h5>
                        <h4> Cyclamen! <img src={Cyclamen} width={40} /></h4>
                        <br></br>
                        

                        <button style={{ color:'grey',font:'Poppins',width:'200px',padding:'10px',fontSize:'14px'}} href={"/mygardens"}>Delete Garden</button>
                      
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