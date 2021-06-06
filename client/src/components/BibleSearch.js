import '../css/Bible.css';
import React from 'react';
import PlantsBibleGrid from './PlantsBibleGrid';


export default function BibleSearch() {
    const q = window.location.search.toString().substring(3);

    return (
        <div>
            <section id="hero" className="d-flex align-items-center">
                <section id="specials" className="specials" style={{ backgroundColor: 'rgba(117, 128, 107,0.85)', marginTop: '19%', marginLeft: '9%', marginRight: '9%', marginBottom: '20%' }}>
                    <div className="container" data-aos="fade-up">
                        <div className="section-title">
                            <h2 style={{ fontSize: '35px' }}>Your search resutls</h2>
                            <p style={{ fontSize: '30px' }}>for plants with "{q}"</p>
                            <div className='scrollBlock' style={{ maxHeight: '300px', overflowY: 'scroll', overflowX: 'hidden' }}>
                                <PlantsBibleGrid q={'/byName/' + q} />
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );

}









