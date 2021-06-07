 import React from 'react';
 import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '../css/PhotoSlide.css';
import PhotoBox from './PhotoBox';

export default function PhotoSlide({ plantID }) {

    const [photos, setPhotos] = React.useState('');

    React.useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL+'/plant/' + plantID)
            .then((response) => {
                response.json().then((data) => {
                    if (data.photos.length > 0) {
                         setPhotos(data.photos);
                     }
                })
            })
    }, []);

    if (photos.length == 0)
        return (<div><h2>Add Photos</h2></div>);
    if (photos.length > 0)
         return (
            <div className="slide-container">
                <Slide>
                    {
                        photos.map((data, key) => {
                             return <PhotoBox slideImg={data} key={key} />
                         })
                    }
                </Slide>
                <br></br>
                <br></br>
                <br></br>
            </div>

        )

}






