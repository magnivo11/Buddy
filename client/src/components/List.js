import React from 'react'
import axios from 'axios';
import GardenComponent from './GardenComponent'


export default function List({ownerID}){
    const [items,setItems]=React.useState([])
    if(items.length==0){
    axios.get('http://localhost:8080/garden/'+ownerID).then(Response=>{
        if(items.length!=Response.data.length)
        setItems(Response.data)

})
    }
    if (items.length<1)
    return("" );

    return( 
        <div>
            {items.map((data,key)=>{
                return <GardenComponent id={data._id} name={data.name} direction={data.direction} key={key}/>
            })}

        </div>
    );


}