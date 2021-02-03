import {Link} from 'react-router-dom';
import statusRed from '../Images/status/red.jpg';


export default function PlantComponent({plantName, plantid}){
   

    return(
        <div>
             <tr>
                         

                    
             <Link to={`/plant/${plantid}`} >{plantName}</Link>
                             <td></td>
                            <td><img src={statusRed} 
                            width={"30px"}></img></td>
                            <td></td>
                            <td>Low Humidity</td>
                         

            </tr>
        </div>
    );


}