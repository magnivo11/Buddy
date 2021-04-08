import React from 'react'
import ButtonsList from './ButtonsList';
import indoorPlants from '../Images/Indoor-plants.jpg';
import DataContext from '../DataContext';





export default function MyGardens(){
    const data=React.useContext(DataContext);
    data.validUser()
    const ownerID= window.sessionStorage.getItem('userID');
    

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
                        <p style={{fontSize:'30px'}}>All Gardens</p>
                      </div>
                    {/*Left buttons*/}
                    <ButtonsList ownerID= {ownerID}/>
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
                          <br></br>
                          <br></br>
                           <img src={indoorPlants}width={'550px'}></img>
                        </div>
                    </div>
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