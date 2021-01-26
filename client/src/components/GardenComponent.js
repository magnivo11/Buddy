import {Link} from 'react-router-dom'


export default function GardenComponent({id,name,direction}){
   

    return(
        <div>
            <h2>  name: {name} direction:{direction}</h2>
            <Link to={`/singlegarden/${id}`} >Go see garden!</Link>
        </div>
    );


}