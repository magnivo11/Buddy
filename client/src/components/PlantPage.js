import '../css/Timeline.scss';
import Pothos from '../Images/pothos.JPG';
import Ivy from '../Images/ivy.JPG';
import Ivy0 from '../Images/PhotoStages/0.jpg';
import Ivy1 from '../Images/PhotoStages/1.JPG';

import Cyclamen from '../Images/cyclamen.JPG';
import light24 from '../Images/Graphs/light1.JPG';
import soil24 from '../Images/Graphs/soil 1.jpg';
import temp24 from '../Images/Graphs/temp 1.jpg';




export default function Plant(){

    return (
      <div>
            
      <section id="hero" className="d-flex align-items-center">
         <section id="specials" className="specials" style={{backgroundColor: 'rgba(245, 245, 220,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}>
           <div className="container" data-aos="fade-up"  >
            <div className="section-title" >
              <h2 style={{fontSize:'40px'}}>Ivy</h2>
              </div>
              <div className="row" data-aos="fade-up" data-aos-delay={100}>
                <div className="col-lg-3"> {/*left buttons*/}
                    <ul className="nav nav-tabs flex-column">
                    <li className="nav-item">
                        <a className="nav-link active show" >All Gardens</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/singlegarden">Balcony</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"  href="/singlegarden">Living Room</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/singlegarden">Bedroom</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"  href="/addagarden">Add A Garden</a>
                    </li>
                    </ul>
                </div>
                <div className="col-lg-8 details order-2 order-lg-1">{/*main content*/}
                  <nav className="nav-menu d-none d-lg-block" > {/*display*/}
                      <ul>
                      <li><a style={{fontSize:'22px'}}>Display:</a></li>
                      <li class="active"><a style={{fontSize:'20px'}} href="/mygardens">Last 24 Hours</a></li>
                      <li><a style={{fontSize:'20px'}} href="/profile">Last 3 Days</a></li>
                      <li><a style={{fontSize:'20px'}} href="/plantsbible">Last Week</a></li>
                      <li></li>
          
                      </ul>
                    </nav>
                  <br></br>
                  <table style={{width: '80%'}}> {/*graphs */}
                    <tbody><tr>
                        <th>Light Exposure</th>
                        <th>Soil Moisure</th>
                        <th>Temperature</th>
                      </tr>
                      <tr>
                        <td><img src={light24}width={'150px'}></img></td> 
                        <td><img src={soil24}width={'150px'}></img></td> 
                        <td> <img src={temp24}width={'150px'}></img></td> 
                      </tr>

                    </tbody></table>
               
                    <div className="col-md-12" style={{width: '75%'}}>  {/*timeline*/}
                          <div style={{display: 'inline-block', width: '100%', overflowY: 'auto'}}>
                            <ul className="timeline timeline-horizontal">
                              <li className="timeline-item" >
                                <div className="timeline-badge primary">
                                <a style={{fontSize:'11px' ,color:'white'}}>14.01.20</a></div>
                                <div className="timeline-panel">
                                <div className="timeline-heading">
                                <img src={Ivy0} width={'60px'}></img>
                                  </div>
                                </div>
                              </li>
                              <li className="timeline-item" >
                                <div className="timeline-badge primary">
                                <a style={{fontSize:'11px' ,color:'white'}}>14.02.20</a></div>
                                <div className="timeline-panel">
                                <div className="timeline-heading">
                                <img src={Ivy1} width={'60px'}></img>
                                  </div>
                                </div>
                              </li> <li className="timeline-item" >
                                <div className="timeline-badge primary">
                                <a style={{fontSize:'11px' ,color:'white'}}>14.03.20</a></div>
                                <div className="timeline-panel">
                                <div className="timeline-heading">
                                <img src={Ivy} width={'60px'}></img>
                                  </div>
                                </div>
                              </li>
                            </ul>
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