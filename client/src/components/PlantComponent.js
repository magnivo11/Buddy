import {Link} from 'react-router-dom';
import statusRed from '../Images/status/red.jpg';


export default function PlantComponent({plantName, plantid}){
   

    return(
        <div>
             <tr>  
             <td ><img src={statusRed} width={"15px"}></img></td>
 
             <Link to={`/plant/${plantid}`}>{plantName}</Link>
            </tr>
        </div>
    );


}