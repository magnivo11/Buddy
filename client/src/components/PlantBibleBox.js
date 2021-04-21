import React from 'react';
import axios from 'axios'
import noImg from '../Images/no_image.PNG'
import { Link } from 'react-router-dom'

export default function PlantBibleBox({ id, species, photo }) {
       const [addPhoto, setPhoto] = React.useState(null);
    React.useEffect(() => {
        if (photo !== null) {
            var url = 'http://localhost:8080/photo/'+photo;
            axios.get(url).then((Response) => {
                 if (Response.data!==null) {
                    setPhoto(Response.data.link);
                 }
                 else {
                    setPhoto(noImg);
                 }
            })
        }
        else {
            setPhoto(noImg);
        }
    }, []);


    return (
        <div className="column">
            <div className="content" style={{textAlign:'center'}}>
                <Link to={`/PlantsBibleSinglePlant/${id}`} >
                    <img src={addPhoto} alt={species} style={{width:'170px' ,height: '170px' }} />
                </Link>
                <br></br>
                <p style={{ fontSize:'28px',textAlign: "center" }}>{species}</p>
                <h6 style={{ textAlign: "center" }}>Click image for more info</h6>


            </div>
        </div>
    )
}