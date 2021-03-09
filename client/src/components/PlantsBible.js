import '../css/Bible.css';
import React from 'react';
import { Link, useHistory } from 'react-router-dom'
 import axios from 'axios';
import DataContext from '../DataContext'
import PlantsBibleGrid from './PlantsBibleGrid';



export default function PlantsBible({ q }) {
 // const user = React.useContext(DataContext);
 var isAuth;
 const ownerID= window.sessionStorage.getItem('userID');
 const [currentUser,setUser]=React.useState({_id:null});
 axios.get('http://localhost:8080/user/'+ownerID).then((Response)=> {
   if(Response.data){
   if(currentUser._id!=Response.data._id)
   {
    isAuth = Response.data.isAdmin;
     setUser(Response.data);
   }
 }
 })
  const [plants, setPlants] = React.useState([])
  // const history = useHistory();
  // const doSearch = (e) => {
  //   if (e.target.value === "") {
  //     history.push('/plantsbible');
  //   }
  //   history.push('plantsbible/search?q=' + e.target.value);
  // }

  React.useEffect(() => {

    let url = 'http://localhost:8080/plant/admin'
    // if (q !== "") {
    //   url += '/name/' + q;
    // }

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
              {/* <input type="text" id="mySearch" placeholder="Search" onChange={doSearch} className="form-control" /> */}
              {isAuth ? <Link className="nav-link" to='/addaplantbyadmin'>Add new Plant</Link> : null}

              <PlantsBibleGrid plants={plants} />

            </div>

          </div>
        </section>
      </section>
    </div>
  );

}


