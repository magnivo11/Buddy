import '../css/Bible.css';
import React from 'react';
import { Link } from 'react-router-dom'
import PlantsBibleGrid from './PlantsBibleGrid';
import Header from './Header';


export default function BibleSearch() {
    const q = window.location.search.toString().substring(3);

    return (
        <div>
            <section id="hero" className="d-flex align-items-center">
                <section id="specials" className="specials" style={{ backgroundColor: 'rgba(245, 245, 220,0.85)', marginTop: '19%', marginLeft: '9%', marginRight: '9%', marginBottom: '20%' }}>
                    <div className="container" data-aos="fade-up">
                        <div className="section-title">
                            <h2 style={{ fontSize: '35px' }}>Your search resutls</h2>
                            <p style={{ fontSize: '30px' }}>for plants with "{q}"</p>
                            <PlantsBibleGrid q={'/byName/'+q} />
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );

}









