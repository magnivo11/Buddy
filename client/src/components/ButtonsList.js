import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ButtonComponent from './ButtonComponent'


export default function ButtonsList({ ownerID }) {
    const [items, setItems] = React.useState([])
    axios.get(process.env.REACT_APP_SERVER_URL+'/garden/' + ownerID).then(Response => {
        if (items.length != Response.data.length)
            setItems(Response.data)
    })
    if (items.length<1)
    return(
        <div>
            <ul className="nav nav-tabs flex-column">
                <li className="nav-item">
            <Link className="nav-link" style={{color:'rgb(205, 164, 94)'}} to='/addagarden'>Add A Garden! </Link>
                </li>
            </ul>       
        </div>
    );
    return( 
        <div  style={{fontFamily: "Open Sans"}}>
        <ul className="nav nav-tabs flex-column">
        <li className="nav-item">
              <Link  className="nav-link" style={{color:'rgb(205, 164, 94)'}} to='/mygardens'>All Gardens </Link>
            </li>
            </ul>
                {items.map((data,key)=>{
                return <ButtonComponent id={data._id} name={data.name} type="/singlegarden/" key={key}/>
            })}
                        <ul className="nav nav-tabs flex-column">
        <li className="nav-item">
               <Link className="nav-link" style={{color:'rgb(205, 164, 94)'}} to='/addagarden'>Add A Garden! </Link>
            </li>
            </ul>
               
            </div>
    );


}