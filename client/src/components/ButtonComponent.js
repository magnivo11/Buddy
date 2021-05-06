import {Link} from 'react-router-dom'


export default function ButtonComponent({id,name,type}){
   

    return(
        <div>
            
        <ul className="nav nav-tabs flex-column">
        <li className="nav-item">
                <Link className="nav-link"  to={`${type}${id}`}>{name} </Link>
            </li>
            </ul>
            </div>
           
    );


}