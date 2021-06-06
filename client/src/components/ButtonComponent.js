import {Link} from 'react-router-dom'


export default function ButtonComponent({id,name,type,setPlantID}){
   
    const plantRender=()=>{
        if(type=='/plant/')
        setPlantID(id)
    }

    return(
        <div>
            
        <ul className="nav nav-tabs flex-column">
        <li className="nav-item">
                <Link className="nav-link" onClick={plantRender}  to={`${type}${id}`}>{name} </Link>
            </li>
            </ul>
            </div>
           
    );


}