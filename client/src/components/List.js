import DataContext from '../DataContext'
import React from 'react'
import axios from 'axios';
import GardenComponent from './GardenComponent'


export default function List({ownerID}){
    const [items,setItems]=React.useState([])
axios.get('http://localhost:8080/garden/'+ownerID).then(Response=>{
    setItems(Response.data)
})
    if (items.length<1)
    return(""
    );
    return( 
        <div>
            {items.map((data,key)=>{
                return <GardenComponent name={data.name} direction={data.direction} key={key}/>
            })}

        </div>
    );


}