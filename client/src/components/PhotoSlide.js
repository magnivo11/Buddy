 import { data } from 'jquery';
import React from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
  
export default function PhotoSlide({ plantID }) {

    const [photos, setPhotos] = React.useState('');

     React.useEffect(() => {
        fetch('http://localhost:8080/plant/photos/all/' + plantID)
            .then((response) => {
                response.json().then((data) => {
                    if (data.length > 0) {
                        setPhotos(data);
                        console.log(photos);
                        console.log(data);
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
                        <div className="each-slide">
 
                             <div style={{backgroundImage: `url(http://localhost:3000/wood-482288_1280.jpg)` }}>
                                <span>Slide {info}</span>
                            </div>
                        </div>
                     })}
                </Slide> 
            </div>
        )


}