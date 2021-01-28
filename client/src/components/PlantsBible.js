import '../css/Bible.css';
import React from 'react';
import roses from '../Images/roses.png'; 
import {Link} from 'react-router-dom'

// replace with data from dataBase
const plants = ['Cyclamen','Mint','Ivy','Sansevieria','Pothos','Australian violet','Basil','Elephant Ears(Colocasia)'];
 


export default function PlantsBible(){
    return (
      <div>
          
       <section id="hero" className="d-flex align-items-center">
       <section id="specials" className="specials" style={{backgroundColor: 'rgba(245, 245, 220,0.85)', marginTop:'19%', marginLeft:'9%', marginRight:'9%', marginBottom:'9%'}}>
       <div className="container" data-aos="fade-up">           
       <div className="section-title">
        <h2 style={{fontSize:'35px'}}>Plants Bible</h2>
       <p style={{fontSize:'30px'}}>All the information in one place</p>
         <input type="text" id="mySearch" onkeyup="myFunction()" placeholder="Search..." title="Type in a category" />
         <Link className="nav-link" to='/addaplantbyadmin'>Add A Plant- Admin only!! </Link>

    
        {/* Portfolio Gallery Grid */}
        <div className="row">
          <div className="column">
            <div className="content">
              <Link to="/plantsbiblesingleplant">
               <img src={roses} alt="Roses" style={{width: '100%'}} />
              </Link>
               <p>Rose</p>
               <h3>Click on the image for more info</h3>

            </div>
          </div>
          <div className="column">
            <div className="content">
              <img src="lights.jpg" alt="Lights" style={{width: '100%'}} />
              <h3>My Work</h3>
              <p>Lorem ipsum..</p>
            </div>
          </div>
         
          <div className="column">
            <div className="content">
              <img src="mountains.jpg" alt="Mountains" style={{width: '100%'}} />
              <h3>My Work</h3>
              <p>Lorem ipsum..</p>
            </div>
          </div>
        </div>
       
       
        {/* END MAIN */}

      </div>     

        </div>
        </section>   
       </section>
       </div>
     );
   }

