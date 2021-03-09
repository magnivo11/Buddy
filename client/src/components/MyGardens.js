import { TableRow } from '@material-ui/core';
import {Link} from 'react-router-dom'
import GardenComponent from './GardenComponent';
import List from './List';
import DataContext from '../DataContext'
import React from 'react'
import ButtonsList from './ButtonsList';



export default function MyGardens(){
    //const user=React.useContext(DataContext);
    const ownerID= window.sessionStorage.getItem('userID');
    

 return (
   <div>
    <section id="hero" className="d-flex align-items-center" >
    <section id="specials" className="specials" style={{backgroundColor: 'rgba(245, 245, 220,0.8)', marginTop:'0%', marginLeft:'9%', marginRight:'9%'}}>
        <div className="container" data-aos="fade-up"  >
            <div className="section-title" >
            <h2 style={{fontSize:'40px'}}>My Gardnes</h2>
            <p style={{fontSize:'30px'}}>All Gardens</p>
            </div>
            <div className="row" data-aos="fade-up" data-aos-delay={100}>
            <ButtonsList ownerID={ownerID} />
            </div>
        </div>
    </section>{/* End Specials Section */}
    </section>
    </div>
  );
}