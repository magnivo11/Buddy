import '../css/Bible.css';
import React from 'react';
import PlantBibleBox from './PlantBibleBox'
import axios from 'axios';



export default function PlantsBibleGrid({ q = '' }) {

    //     React.useEffect(() => {
    //        var url = 'http://localhost:8080/plant/byName/'+Q;
    //        axios.get(url).then((Response) => {
    //            if (plants.length != Response.data.length)
    //                setPlants(Response.data);
    //        })
    //    }, [Q]);

    const [plants, setPlants] = React.useState([])
    React.useEffect(() => {
        fetch('http://localhost:8080/plant/admin'+q)
            .then((response) => response.json())
            .then((data) => setPlants(data));
    }, [q]);



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


