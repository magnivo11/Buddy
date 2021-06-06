import '../css/Bible.css';
import React from 'react';
import { Link } from 'react-router-dom'
 import PlantsBibleGrid from './PlantsBibleGrid';
 
export default function PlantsBible() {
  const ownerID = window.sessionStorage.getItem('userID');
  const [editPermission, setEditPermission] = React.useState(false);
  React.useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL + '/user/' + ownerID)
      .then(response => response.json()).then(
        data => {
           if (data.isAdmin)
            setEditPermission(true);

        }
      )
  }, []);


  return (
    <div style={{ fontFamily: "Open Sans" }}>
      <section id="hero" className="d-flex align-items-center" >
        <section id="specials" className="specials" style={{ backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop: '0%', marginLeft: '9%', marginRight: '9%' }}>
          <div className="container" data-aos="fade-up" >
            <div className="section-title">
              <h2 style={{ fontSize: '30px' }}>Plants Bible</h2>
              <p style={{ fontSize: '25px' }}>All the information in one place</p>
              {editPermission ? (<Link className="nav-link" to='/addaplantbyadmin'>Add new Plant</Link>) : ""}
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


