 
import noImg from '../Images/no_image.PNG'
import {Link} from 'react-router-dom'

export default function PlantBibleBox({id,species,photo}){
   
    if(!photo)
    {
        photo = noImg; 
    }
 

    return(
        <div className="column">
        <div className="content">
           <Link to={`/PlantsBibleSinglePlant/${id}`} >
           <img src={photo} alt={species} style={{width: '100%'}} />
          </Link>
            <p style={{textAlign: "center"}}>{species}</p>
            <h6 style={{textAlign: "center"}}>Click on the image for more info</h6>

 
        </div>
      </div>
)}