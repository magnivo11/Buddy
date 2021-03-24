
import statusRed from '../Images/status/red.jpg';
import {Link} from 'react-router-dom'

export default function PlantBox({id,species,photo}){
   
    return(
        <div className="column">
        <div className="content">
        <Link to={`/plant/${id}`}>
           <img class="center" src={statusRed} alt={species} style={{width: '20%'}} />
           <p style={{textAlign: "center"}}>{species}</p>
          </Link>
        </div>
      </div>
)}