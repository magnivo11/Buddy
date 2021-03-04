import '../css/Bible.css';
import React from 'react';
import PlantBibleBox from './PlantBibleBox'
   


export default function PlantsBibleGrid({ plants }) {

    return (
        <>
            {/* Portfolio Gallery Grid */}

            <div className="row">
                {
                    plants.map((data, key) => {
                        return <PlantBibleBox id={data._id} species={data.species} photo={data.defaultPhotoID} key={key} />
                    })
                }
            </div>

        </>
    );

}


