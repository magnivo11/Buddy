import '../css/Bible.css';
import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import PlantsBibleGrid from './PlantsBibleGrid';
import UploadImg from './UploadImg';
  
export default function PlantsBible() {
  const ownerID = window.sessionStorage.getItem('userID');
  const [currentUser, setUser] = React.useState({ _id: null });
  const [isAdmin, setAdmin] = React.useState(false);

  React.useEffect(() => {
    axios.get('http://localhost:8080/user/' + ownerID).then((Response) => {
      if (Response.data) {
        if (currentUser._id !== Response.data._id) {
          console.log(Response.data.isAdmin); 
          setAdmin(Response.data.isAdmin);
          setUser(Response.data);
        }
      }
    })
  }, []);


  return (
    <div>
      <br></br>
      <br></br>
      <section id="hero" className="d-flex align-items-center" >
        <section id="specials" className="specials" style={{ backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop: '0%', marginLeft: '9%', marginRight: '9%' }}>
          <div className="container" data-aos="fade-up" >
            <div className="section-title">
              <h2 style={{ fontSize: '35px' }}>Plants Bible</h2>
              <p style={{ fontSize: '30px' }}>All the information in one place</p>
               { isAdmin ? (<Link className="nav-link" to='/addaplantbyadmin'>Add new Plant</Link>):""}  
               <div className='scrollBlock' style={{ maxHeight: '300px', overflowY: 'scroll', overflowX: 'hidden' }}>
                <PlantsBibleGrid q={''} />
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );

}


