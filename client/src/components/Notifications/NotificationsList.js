import React from 'react'
import axios from 'axios';
import Notification from './Notification'


export default function NotificationsList({notifications}){


    console.log(notifications)
    if (notifications.length<1)
    return("" );

    else{
    return( 
        <div>
            {notifications.map((data,key)=>{
                return <Notification date={data.date} status={data.plantStatus} type={data.type} key={key}/>
            })}  
        </div>
    );
    }

}