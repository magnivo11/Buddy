import '../css/AboutUs.css';
import Shir from '../Images/AboutUs/shir.JPG';
import Gal from '../Images/AboutUs/gal.jpeg';
import Niv from '../Images/AboutUs/niv.JPG';
import Arik from '../Images/AboutUs/Arik.jpg';
import Matan from '../Images/AboutUs/Matan.jpg';




export default function AboutUs(){
    return (
      <div style={{fontFamily: "Open Sans"}}>
       <section id="hero" className="d-flex align-items-center" style={{overflow:'scroll'}}>
       <section id="specials" className="specials" style={{backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}> 
           <div className="container" data-aos="fade-up"  >
             <div className="section-title" >
               <br/><br/><br/> <br/>
                <h2 style={{fontSize:'35px'}}>About Us</h2>
              </div>
              <div>

                <meta name="viewport" content="width=device-width, initial-scale=1" />
            
                <br />
                <div className="row">
                  <div className="column">
                    <div className="card" >
                      <img src={Shir} alt="Jane" style={{width: '100%'}} />
                        <h2 style={{color:'grey'}}>Shir Koren</h2>
                        <p className="title">Developer</p>
                        <p><a href="https://github.com/korenshir"><button className="button"><i className="fa fa-github" aria-hidden="true"></i></button></a>&nbsp;
                        <a href="https://www.linkedin.com/in/shir-koren-232a67197/"><button className="button" style={{backgroundColor:'rgb(0,114,177)'}}><i className="fa fa-linkedin" aria-hidden="true"></i></button></a>&nbsp;
                        <a href="mailto:Korenshir@gmail.com"><button className="button" style={{backgroundColor:'rgb(0,114,100)'}}><i className="fa fa-envelope" aria-hidden="true"></i></button></a>
                        </p>
                    </div>
                  </div>
                  <div className="column">
                    <div className="card">
                      <img src={Niv} alt="Jane" style={{width: '100%'}} />
                        <h2 style={{color:'grey'}} >Niv Levy</h2>
                        <p className="title">Developer</p>  
                        <p><a href="https://github.com/magnivo11"><button className="button"><i className="fa fa-github" aria-hidden="true"></i></button></a>&nbsp;
                        <a href="https://www.linkedin.com/in/nivo-levy-414b4a176/"><button className="button" style={{backgroundColor:'rgb(0,114,177)'}}><i className="fa fa-linkedin" aria-hidden="true"></i></button></a>&nbsp;
                        <a href="mailto:Magnivo11@gmail.com"><button className="button" style={{backgroundColor:'rgb(0,114,100)'}}><i className="fa fa-envelope" aria-hidden="true"></i></button></a>
                        </p>
                    </div>
                  </div>
                  <div className="column">
                    <div className="card">
                      <img src={Gal} alt="Jane" style={{width: '100%'}} />
                        <h2 style={{color:'grey'}} >Gal Shaked</h2>
                 
                        <p className="title">Developer</p>  
                        <p><a href="https://github.com/galsh1994"><button className="button"><i className="fa fa-github" aria-hidden="true"></i></button></a>&nbsp;
                        <a href="https://www.linkedin.com/in/gal-shaked-b97361164/"><button className="button" style={{backgroundColor:'rgb(0,114,177)'}}><i className="fa fa-linkedin" aria-hidden="true"></i></button></a>&nbsp;
                        <a href="mailto:Galsh1994@gmail.com"><button className="button" style={{backgroundColor:'rgb(0,114,100)'}}><i className="fa fa-envelope" aria-hidden="true"></i></button></a>
                        </p>

                    </div>
                  </div>
                  <div className="column">
                    <div className="card">
                      <img src={Arik} alt="Jane" style={{width: '100%'}} />
                        <h2 style={{color:'grey'}} >Arik Zaadi</h2>
                        <p className="title">Developer</p>  
                        <p><a href="https://github.com/Atsaady"><button className="button"><i className="fa fa-github" aria-hidden="true"></i></button></a>&nbsp;
                        <a href="https://www.linkedin.com/in/arik-saadi-313379172/"><button className="button" style={{backgroundColor:'rgb(0,114,177)'}}><i className="fa fa-linkedin" aria-hidden="true"></i></button></a>&nbsp;
                        <a href="mailto:Galsh1994@gmail.com"><button className="button" style={{backgroundColor:'rgb(0,114,100)'}}><i className="fa fa-envelope" aria-hidden="true"></i></button></a>

                        </p>

                    </div>
                  </div>
                  <div className="column">
                    <div className="card">
                      <img src={Matan} alt="Jane" style={{width: '100%'}} />
                        <h2 style={{color:'grey'}} >Matan Katz</h2>                 
                        <p className="title">Developer</p>  
                        <p><a href="https://github.com/mati340"><button className="button"><i className="fa fa-github" aria-hidden="true"></i></button></a>&nbsp;
                        <a href="https://www.linkedin.com/in/matan-katz-4440ab19a/"><button className="button" style={{backgroundColor:'rgb(0,114,177)'}}><i className="fa fa-linkedin" aria-hidden="true"></i></button></a>&nbsp;
                        <a href="mailto:Mati340@gmail.com"><button className="button" style={{backgroundColor:'rgb(0,114,100)'}}><i className="fa fa-envelope" aria-hidden="true"></i></button></a>
                        </p>

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