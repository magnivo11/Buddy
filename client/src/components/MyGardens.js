import React from 'react'
import ButtonsList from './ButtonsList';
import indoorPlants from '../Images/Indoor-plants.jpg';

export default function MyGardens() {
  const ownerID = window.sessionStorage.getItem('userID');

  return (
    
    <div>
     <section id="hero" className="d-flex align-items-center" style={{overflow:'scroll'}} >
     <section id="about" className="about" >
          <section id="specials" className="specials" style={{backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}>
            <div className="col-lg-6 order-1 order-lg-1 ">
            <ul className="nav nav-tabs flex-column">
                      {/*Title*/}
                      <div className="section-title" >
                        <h2 style={{fontSize:'36px'}}></h2>
                      </div>                      <br/><br/>
                      {/*Left buttons*/}
                    <ButtonsList ownerID= {ownerID}/>
                  </ul>
          </div>
          <div className="col-lg-6 order-2 order-lg-2" data-aos="zoom-in" data-aos-delay={100}>
            
            <br/><br/><br/><br/>
            <div className="about-img">
              
              <img src={indoorPlants} alt="" />
            </div>
          </div>
  </section>
  </section>
  </section>
</div >);
}