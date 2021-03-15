import {Link} from 'react-router-dom'


export default function ButtonComponent({id,name,buttonClicked}){
   

    return(
        <div>
        <ul className="nav nav-tabs flex-column">
            <li  className="nav-menu d-none d-lg-block">
                <Link className="nav-link" onClick={buttonClicked} to={`/singlegarden/${id}`}>{name} </Link>
            </li>
            </ul>
        </div>
    );


}