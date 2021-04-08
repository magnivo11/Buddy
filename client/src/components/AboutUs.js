import '../css/AboutUs.css';
import Shir from '../Images/AboutUs/shir.JPG';
import Gal from '../Images/AboutUs/gal.jpeg';
import Niv from '../Images/AboutUs/niv.JPG';



export default function AboutUs(){
    return (
    <div>
    <section id="hero" className="d-flex align-items-center" style={{overflow:'scroll'}}>
          <section id="specials" className="specials" style={{backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}>
           
           <div className="container" data-aos="fade-up"  >
             <div className="section-title" >
               <br></br>
               <br></br>
                <h2 style={{fontSize:'35px'}}>About Us</h2>
              </div>
              <div>

                <meta name="viewport" content="width=device-width, initial-scale=1" />
            
                <br />
                <div className="row">
                  <div className="column"style={{marginLeft: "170px"}}>
                    <div className="card" >
                      <img src={Shir} alt="Jane" style={{width: '100%'}} />
                        <h2 style={{color:'grey'}}>Shir Koren</h2>
                        <p className="title">Developer</p>
                        <p className="title">Korenshir@gmail.com</p>  

                    </div>
                  </div>
                  <div className="column">
                    <div className="card">
                      <img src={Niv} alt="Jane" style={{width: '100%'}} />
                        <h2 style={{color:'grey'}} >Niv Levy</h2>
                        <p className="title">Developer</p>  
                        <p className="title">Magnivo11@gmail.com</p>  

                    </div>
                  </div>
                  <div className="column">
                    <div className="card">
                      <img src={Gal} alt="Jane" style={{width: '100%'}} />
                        <h2 style={{color:'grey'}} >Gal Shaked</h2>
                 
                        <p className="title">Developer</p>  
                        <p className="title">Galsh1994@gmail.com</p>  
                     
                        {/*<p><button className="button">Galsh1994@gmail.com</button></p>*/}
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