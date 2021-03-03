import DataContext from '../DataContext'
import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import ButtonComponent from './ButtonComponent'


export default function ButtonsList({ownerID}){
    const [items,setItems]=React.useState([])
    axios.get('http://localhost:8080/garden/'+ownerID).then(Response=>{
        if(items.length!=Response.data.length)
        setItems(Response.data)

})
    if (items.length<1)
    return("" );

    return( 
        <div>
            <div className="col-lg-3">
                <ul className="nav nav-tabs flex-column">
                {items.map((data,key)=>{
                return <ButtonComponent id={data._id} name={data.name} key={key}/>
            })}
                 <li className="nav-item">
                <Link className="nav-link" to='/addagarden'>Add A Garden! </Link>
            </li>
                </ul>
               
            </div>
        </div>
    );


}