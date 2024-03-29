import React from 'react'
import axios from 'axios';
import Notification from './Notification'


export default function NotificationsList({notifications}){
    if (notifications.length<1)
    return("" );

    else{
    return( 
        <div>
            {notifications.slice(0).reverse().map((data,key)=>{
                return <Notification date={data.date} status={data.plantStatus} type={data.type} plantID={data.plantID} gardenName={data.gardenName} plantSpecies={data.plantSpecies} key={key}/>
            })}  
        </div>
    );
    }

}