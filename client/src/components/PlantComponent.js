import {Link} from 'react-router-dom';
import statusRed from '../Images/status/red.jpg';


export default function PlantComponent({plantid}){
   

    return(
        <div>
             <tr>
                         

                    
             <Link to={`/plant/${plantid}`} >{plantid}</Link>
                            <td><img src={statusRed} width={"30px"}></img></td>
                            <td>Low Humidity</td>
                         

            </tr>
        </div>
    );


}