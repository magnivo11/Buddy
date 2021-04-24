import {Link} from 'react-router-dom'
import React from 'react';
import { easeCubicOut } from 'd3-ease';


export default function Notification({date,status,type}){
   
    const [message,setMessage]=React.useState([]);
    const [time,setTime]=React.useState([]);
    React.useEffect(()=> getMessage(setMessage,status,type),[])
    React.useEffect(()=> getTime(setTime,date),[])


    return(
        <div>
            <h2 style={{fontSize:'14px'}}> {"*"}{message} </h2>
            <h2 style={{fontSize:'10px'}}>  {"   "+time+" min ago"}</h2>
            <br/>
        </div>
    );

}
//setting the right message according to data
const getMessage= (setMessage,status,type)=>{

    var message="";
    if (type=='soilMoisture'){
        if(status=='-2')
        { message = "Looks like your soil is overwatered, Do not water for the next 24 hours"}
        if(status=='-3')
        { message = "Your soil is extremely overwatered, Do not water for the next few days"}
        if(status=='2')
        { message = "Looks like your soil needs watering"}
        if(status=='3')
        { message = "Your soil needs watering as soon as possible"}
    }
    if (type=='temperature'){
        if(status=='-2')
        { message = "Looks like your plant is a little cold, Consider changing its location"}
        if(status=='-3')
        { message = "Your plant is very cold, We recommend changing its location"}
        if(status=='2')
        { message = "Looks like your plant is a little hot, Consider changing its location"}
        if(status=='3')
        { message = "Your plant is very cold, We recommend changing its location"}
    }
    if (type=='light'){
        if(status=='-2')
        { message = "Looks like your plant does not get enought light, Consider changing its location"}
        if(status=='-3')
        { message = "Your plant does not get enought light, We recommend changing its location"}
        if(status=='2')
        { message = "Looks like your plant get too much light, Consider changing its location"}
        if(status=='3')
        { message = "Your plant is has over exposure to light, We recommend changing its location"}
    }
    setMessage(message);
}
//setting the time that has passed since the notification was sent

const getTime=(setTime,date)=>{
    const d = new Date(date);
    const now = new Date();

    var diff = (now-d);
    var diffDays = Math.floor(diff / 86400000); // days
    var diffHrs = Math.floor((diff % 86400000) / 3600000); // hours
    var diffMins = Math.floor((diff/1000)/60)%60 ;
    var timestamp = diffMins;
    if (diffHrs){
        if (diffHrs==1) timestamp = diffHrs + " hour, " + timestamp;
        else (timestamp = diffHrs + " hours, " + timestamp);
    }
    if (diffDays){
        if (diffDays==1) timestamp = diffDays + " day, " + timestamp;
        else (timestamp = diffDays + " days, " + timestamp);
    }
    setTime(timestamp);
  }