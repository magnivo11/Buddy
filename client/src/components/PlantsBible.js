import '../css/Bible.css';
import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import DataContext from '../DataContext'
import PlantsBibleGrid from './PlantsBibleGrid';



export default function PlantsBible({q}) {
  const user = React.useContext(DataContext);
  const isAuth = user.isAdmin;
  const [plants, setPlants] = React.useState([])
  

  React.useEffect(() => {

    var url = 'http://localhost:8080/plant/admin'
    axios.get(url).then((Response) => {
      if (plants.length != Response.data.length)
        setPlants(Response.data);
    })
  }, []);

  if (plants.length < 1)
    return ("");

  return (
    <div>
      <section id="hero" className="d-flex align-items-center">
        <section id="specials" className="specials" style={{ backgroundColor: 'rgba(245, 245, 220,0.85)', marginTop: '19%', marginLeft: '9%', marginRight: '9%', marginBottom: '20%' }}>
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2 style={{ fontSize: '35px' }}>Plants Bible</h2>
              <p style={{ fontSize: '30px' }}>All the information in one place</p>
               {isAuth ? <Link className="nav-link" to='/addaplantbyadmin'>Add new Plant</Link> : null}
              <PlantsBibleGrid plants={plants} />
            </div>
          </div>
        </section>
      </section>
    </div>
  );

}


