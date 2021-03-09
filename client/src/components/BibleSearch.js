import '../css/Bible.css';
import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
 import PlantsBibleGrid from './PlantsBibleGrid';
import Header from './Header';


export default function BibleSearch() {
     var q = window.location.search.toString().substring(3);
      const [plants, setPlants] = React.useState([])
     React.useEffect(() => {
        var url = 'http://localhost:8080/plant/byName/'+q;
        axios.get(url).then((Response) => {
            if (plants.length != Response.data.length)
                setPlants(Response.data);
        })
    }, [q]);
   
    return (
         <div>
            <section id="hero" className="d-flex align-items-center">
                <section id="specials" className="specials" style={{ backgroundColor: 'rgba(245, 245, 220,0.85)', marginTop: '19%', marginLeft: '9%', marginRight: '9%', marginBottom: '20%' }}>
                    <div className="container" data-aos="fade-up">
                        <div className="section-title">
                            <h2 style={{ fontSize: '35px' }}>Your search resutls</h2>
                            <p style={{ fontSize: '30px' }}>for plants with "{q}"</p>
                             <PlantsBibleGrid plants={plants} />
                        </div>
                    </div>
                </section>
            </section>
        </div>
     );

}









