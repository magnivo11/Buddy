import {Link} from 'react-router-dom'


export default function ButtonComponent({id,name}){
   

    return(
        <div>
            <li className="nav-item">
                <Link className="nav-link" to='/singlegarden'>{name} </Link>
            </li>
        </div>
    );


}