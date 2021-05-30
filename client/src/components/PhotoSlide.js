import { data } from 'jquery';
import React from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export default function PhotoSlide({ plantID }) {

    const [photos, setPhotos] = React.useState('');

    React.useEffect(() => {
        fetch('http://localhost:8080/plant/' + plantID)
            .then((response) => {
                response.json().then((data) => {
                    console.log(data);
                    if (data.photos.length > 0) {
                        setPhotos(data.photos);
                    }
                })
            })
    }, [plantID]);

    if (photos.length == 0)
        return (<div><h2>Add Photos</h2></div>);
    if (photos.length > 0)
        return (
            <div className="slide-container">
                <Slide>
                    {photos.map((info, key) => {
                        <div className="each-slide" key={key}>
                            <img src={`http://localhost:8080/photo/find/${info}`} ></img>
                            <span>Slide {info}</span>
                        </div>
                     })}
                </Slide> 
            </div >
        )


}