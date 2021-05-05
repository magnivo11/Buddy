import React from 'react'
import ButtonsList from './ButtonsList';
import indoorPlants from '../Images/Indoor-plants.jpg';

export default function MyGardens() {
  const ownerID = window.sessionStorage.getItem('userID');

  return (
    <div>
     <section id="hero" className="d-flex align-items-center" >
     <section id="about" className="about" >
          <section id="specials" className="specials" style={{backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}>
          <div className="row">
            <div className="col-lg-6 order-1 order-lg-1 ">
              <div className="section-title" >
                <h2 ><large>My Gardnes</large></h2>
                <p >All Gardens</p>
              </div>
              <ButtonsList ownerID={ownerID} />
          </div>
          <div className="col-lg-6 order-2 order-lg-2" data-aos="zoom-in" data-aos-delay={100}>
            <div className="about-img">
              <img src={indoorPlants} alt="" />
            </div>
          </div>
        </div>
  </section>
  </section>
  </section>
</div >);
}
/* /*
  //  <div>
  //   <section id="hero" className="d-flex align-items-center" style={{overflow:'scroll'}}>
  //       <section id="specials" className="specials" style={{backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}>
  //         <div className="container" data-aos="fade-up"  >
  //           <div className="row" data-aos="fade-up" data-aos-delay={100}>
  //           <div class="col-lg-6 order-1 order-lg-2" data-aos="zoom-in" data-aos-delay="100">
  //           <div class="about-img">
  //             <img src={indoorPlants} alt=""></img>
  //           </div>
  //           </div>
  //             <div className="col-lg-3">
  //                 <ul className="nav nav-tabs flex-column">
  //                     <div className="section-title" >
  //                       <h2 style={{fontSize:'36px'}}>My Gardnes</h2>
  //                       <p style={{fontSize:'30px'}}>All Gardens</p>
  //                     </div>
  //                   <ButtonsList ownerID= {ownerID}/>
  //                 </ul>
  //             </div>

  //           <div className="col-lg-9 mt-4 mt-lg-0">
  //             <div className="tab-content">
  //               <div className="tab-pane active show" id="tab-1">
  //                   <div className="row">
  //                       <div className="col-lg-8 details order-2 order-lg-1">
  //                           <img src={indoorPlants}width={'550px'}></img>
  //                       </div>
  //                   </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   </section>
  // </div> */
